import { client } from "@/sanity/lib/client";

interface cartItem {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  inventory: number;
  description: string;
  imageurl: string;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const createCustomerinSanity = async (customerInfo: Customer) => {
  try {
    const customerObj = {
      _type: "customer",
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
    };

    const response = await client.create(customerObj);
    console.log("User created in sanity", response);
    return response;
  } catch (error) {
    console.log("Error while creating user in sanity", error);
    throw error;
  }
};

const createOrderinSanity = async (
  cartData: cartItem[],
  customer_id: string
) => {
  try {
    const orderObj = {
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customer_id,
      },
      items: cartData.map((item: cartItem) => ({
        _type: "items",
        _id: item._id,
        product_name: item.title,
        product_description: item.description,
        product_price: item.price,
        product_qty: item.quantity,
      })),
      order_date: new Date().toDateString(),
    };

    const response = await client.create(orderObj);
    console.log("order created in sanity", response);
    return response;
  } catch (error) {
    console.log("Error while creating order in sanity", error);
    throw error;
  }
};

const CheckOut = async (cart: cartItem[], customerInfo: Customer) => {
  try {
    const customer = await createCustomerinSanity(customerInfo);
    await createOrderinSanity(cart, customer._id)
    console.log("checkout complted")
  } catch (error) {
    console.log("Error while creating customer and order in sanity", error);
    throw error;
  }

  return false;
};

export default CheckOut;
