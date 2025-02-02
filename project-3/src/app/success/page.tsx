import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Success = () => {
  return (
    <div className="h-[90vh] bg-white flex flex-col items-center justify-center primary-text-color md:gap-3 gap-1 md:pt-[90px] pt-[100px] ml-[20px]">
      <p className="text-[#4F46E5] font-bold">SUCCESS</p>
      <h1 className="md:text-5xl text-4xl font-bold">Your order has been placed! 🎉</h1>
      <p className="text-gray-500">Thank you for your purchase!</p>

      <Link
        href={"/product"}
        className="w-[100%] flex items-center justify-center"
      >
        <button className="h-[45px] w-[200px] rounded mt-5 flex items-center justify-center gap-3 text-white font-semibold primary-bg-color">
          Continue Shopping <FaArrowRight />{" "}
        </button>
      </Link>
    </div>
  );
};

export default Success;
