import { NextResponse } from "next/server";
import Stripe from "stripe"; // Use the default import for Stripe
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

// Define types for the incoming product data and Stripe API responses
interface Product {
  title: string;
  price: number;
  quantity: number;
}

interface IncomingRequestBody {
  products: Product[];
}

interface StripeProduct extends Stripe.Product {
  id: string;
  name: string;
}

// Define the function for handling the POST request
export const POST = async (req: Request) => {
  try {
    // Parse the incoming request to get the product data
    const { products }: IncomingRequestBody = await req.json();
    console.log("Received products:", products);

    // Get a list of active products from Stripe
    let activeProducts = await stripe.products.list({ active: true });
    console.log("Active products from Stripe:", activeProducts);

    // Loop through each product in the request
    for (const product of products) {
      // Check if the product already exists in Stripe
      const existingProduct = activeProducts.data.find(
        (p: StripeProduct) =>
          p.name.toLowerCase() === product.title.toLowerCase()
      );

      if (!existingProduct) {
        // If the product does not exist, create a new product in Stripe
        const newProduct = await stripe.products.create({
          name: product.title, // Use product's title as the name
        });
        console.log("Created new product in Stripe:", newProduct);

        // Create a price for the new product (in cents)
        await stripe.prices.create({
          unit_amount: Math.round(product.price * 100), // Convert price to cents
          currency: "usd",
          product: newProduct.id,
        });

        // Refresh the list of active products after adding a new one
        activeProducts = await stripe.products.list({ active: true });
      }
    }

    // Prepare the line items for the checkout session
    const stripeProducts: { price: string; quantity: number }[] = [];
    for (const product of products) {
      const existingProduct = activeProducts.data.find(
        (p: StripeProduct) =>
          p.name.toLowerCase() === product.title.toLowerCase()
      );

      if (existingProduct) {
        // Get the price details for the existing product
        const prices = await stripe.prices.list({
          product: existingProduct.id,
          active: true,
        });
        console.log("Prices for product:", prices);

        // Add the product to the checkout line items if it has a price
        if (prices.data[0]) {
          stripeProducts.push({
            price: prices.data[0].id,
            quantity: product.quantity,
          });
        }
      }
    }

    // If no valid products were found, return an error response
    if (stripeProducts.length === 0) {
      return NextResponse.json(
        { error: "No valid products found for checkout." },
        { status: 400 }
      );
    }

    // Create a Stripe checkout session with the line items
    const session = await stripe.checkout.sessions.create({
      line_items: stripeProducts,
      mode: "payment", // Set checkout mode to 'payment'
      success_url: `http://localhost:3000/success`, // Success page URL
      cancel_url: `http://localhost:3000/`, // Cancel page URL
    });
    console.log("Created checkout session:", session);

    // Return the checkout session URL
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    // Narrowing the type of error to access message safely
    if (error instanceof Error) {
      // Handle any errors during the process and return an error response
      console.error("Error during checkout process:", error);
      return NextResponse.json(
        {
          error: `An internal error occurred: ${error.message || error}`,
        },
        { status: 500 }
      );
    } else {
      // In case the error is not an instance of Error, we return a generic message
      console.error("Unknown error during checkout process:", error);
      return NextResponse.json(
        {
          error: `An internal error occurred. Details: ${String(error)}`,
        },
        { status: 500 }
      );
    }
  }
};
