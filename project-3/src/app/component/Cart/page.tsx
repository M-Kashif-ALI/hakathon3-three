"use client";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { CartContext } from "../../context";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Cart = () => {
  const { add } = useContext(CartContext);
  const { cart, del, count, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const taxRate = 0.08;
  const shippingCost = 5.99;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + shippingCost;

  return (
    <main className="px-4 sm:px-6 lg:px-20 min-h-screen bg-white text-black">
      <h1 className="text-2xl sm:text-3xl font-bold my-8 sm:my-10 py-10">
        Bag items : ({count})
      </h1>

      <div className="flex">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <li
                key={item._id}
                className="py-4 flex items-start pl-3 gap-5 w-[830px] border-b"
              >
                <Image
                  src={item.imageurl}
                  alt={item.title}
                  height={150}
                  width={150}
                />
                <div className="text-[#757575] mr-[110px] flex flex-col">
                  <span className="text-[#272343]">{item.title}</span>
                  <span className="text-sm mt-3">{item.description}</span>

                  <span className="text-sm flex items-center my-3 gap-3">
                    Quantity{" "}
                    <button
                      onClick={() => add({ ...item, quantity: 1 })}
                      className="text-lg text-black border hover:bg-slate-100"
                    >
                      <IoMdAdd />
                    </button>{" "}
                    {item.quantity}
                    <button
                      onClick={() => del(item._id)}
                      className="text-lg text-black border hover:bg-slate-100"
                    >
                     <IoRemove />
                    </button>
                  </span>

                  <button
                    className="text-[24px] rounded-full duration-200 px-1 py-1 mt-2"
                    onClick={clearCart}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <div className="w-[90vw] text-center">
            <p className="font-bold text-3xl">Your cart is empty</p>
            <Link href={"/product"} className="w-[100%] flex items-center justify-center" >
            <button className="bg-cyan-400 h-[45px] w-[200px] rounded mt-3 flex items-center justify-center gap-3 text-gray-800">Continue Shopping <FaArrowRight /> </button>
            </Link>
          </div>
        )}
        <div className="mt-6 w-[350px]">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t my-2 border-b py-5">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-center">
            <button className="h-[60px] w-[270px] py-2 mt-4 bg-[#029FAE] text-white  hover:bg-[#21b1be] duration-200 rounded-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
