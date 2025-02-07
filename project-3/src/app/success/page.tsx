"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "../context";
import CheckOut from "@/actions/checkOut";

const Success = () => {
  const { cart, clearCart } = useContext(CartContext);

  const [customerinfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (cart.length === 0) {
    return (
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerinfo, [name]: value });
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CheckOut(cart, customerinfo)


    clearCart();
  };

  return (
    <div className="h-[90vh] bg-white flex flex-col items-center justify-center primary-text-color md:gap-3 gap-1 md:mt-[190px] mt-[200px] md:mb-[0] mb-[50px] ml-[20px]">
      <p className="text-[#4F46E5] font-bold">Payment Successful!</p>
      <p className="text-gray-500">
        Thank you for your purchase. Please fill out the form below to complete
        your order.
      </p>

      <form className="w-full max-w-md space-y-4" onSubmit={handleCheckout}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={customerinfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={customerinfo.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel" // Use tel instead of number for phone numbers
            value={String(customerinfo.phone)} // Ensure phone number is treated as string
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={customerinfo.address}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-customGreen text-white font-medium rounded-md hover:bg-green-500 transition duration-200"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Success;
