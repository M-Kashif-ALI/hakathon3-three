import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

interface Product {
  title: string;
  price: number;
  quantity: number;
  imageurl: string;
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (!body.products || body.products.length === 0) {
      return new NextResponse("No products in checkout", { status: 400 });
    }

    const lineItems = body.products.map((item: Product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.imageurl],
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Log the full error for debugging
    console.error("Checkout error:", error);

    // Check if Stripe error and return message
    if (error instanceof Stripe.errors.StripeError) {
      return new NextResponse(
        `Stripe error: ${error.message}`,
        { status: 500 }
      );
    }

    // Default error handling
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
