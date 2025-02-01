import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string);


interface CartProducts {
  title: string;
  price: number;
  quantity: number;
  imageurl: string;
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { products }: { products: CartProducts[] } = body;

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.imageurl ? [item.imageurl] : [],
        },
        unit_amount: item.price * 100,
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
    if (error instanceof Error) {
      console.log(error.message);
      return new NextResponse(error.message, { status: 500 });
    }

    console.log("Error", error);
    return new NextResponse("An unexpected error occurred", { status: 500 });
  }
};
