"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCart2 } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Link from "next/link";
import { CartContext } from "@/app/context";
import SearchBar from "../SearchBar";
import { SearchResults } from "../SearchResults";

interface Product {
  _id: string;
  title: string;
}

const NavBar = () => {
  const { count } = useContext(CartContext);
  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F0F2F3] z-50 text-black">
      {/* Topbar */}
      <div className="bg-[#272343] h-[45px] text-gray-400 flex justify-between items-center px-4 md:px-8">
        <p className="flex items-center gap-1 text-sm">
          <FiCheck />
          No free shipping
        </p>
        <ul className="flex items-center gap-3 text-sm">
          <li>Eng</li>
          <li>Faqs</li>
          <li className="flex items-center gap-1">
            <AiOutlineExclamationCircle />
            Need Help
          </li>
        </ul>
      </div>
      {/* Main Navbar */}
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src={`/images/logo1.png`}
            alt="Comforty Logo"
            width={40}
            height={50}
            className="w-[26.6px] h-[23.3px]"
          />
          <Link href={`/`}>
            <span className="font-bold text-2xl cursor-pointer">Comforty</span>
          </Link>
        </div>
        {/* Search Bar */}
        <div className="h-[70px] md:w-[300px] min-w-[200px] hidden md:flex flex-col items-center justify-center">
          <SearchBar setResults={setResults} setIsActive={setIsActive} />
          <SearchResults results={results} isActive={isActive} />
        </div>
        {/* Cart and Hamburger */}
        <div className="flex items-center gap-4">
          <Link href={"/component/Cart"}>
            <div className="hover:text-purple-600 cursor-pointer flex gap-2 h-[44px] md:w-[120px] w-[100px] ml-[10px] rounded items-center justify-center bg-white">
              <BsCart2 />
              cart{" "}
              <span className="bg-[#007580] font-serif rounded-full w-[20px] h-[20px] text-sm text-white flex items-center justify-center">
                {count}
              </span>
            </div>
          </Link>
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setOpen(!isOpen)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[120px] left-0 w-full bg-white shadow-md z-40">
          <ul className="flex flex-col items-start gap-4 px-6 py-4">
            <Link href={`/`} onClick={() => setOpen(false)}>
              <li className="hover:text-purple-600 cursor-pointer">Home</li>
            </Link>
            <Link href={`/product`} onClick={() => setOpen(false)}>
              <li className="hover:text-purple-600 cursor-pointer">Product</li>
            </Link>
            <Link href={`/component/About`} onClick={() => setOpen(false)}>
              <li className="hover:text-purple-600 cursor-pointer">About</li>
            </Link>
            <Link href={`/component/Contact`} onClick={() => setOpen(false)}>
              <li className="hover:text-purple-600 cursor-pointer">Contact</li>
            </Link>
          </ul>
          <div className="h-[70px] w-[350px] flex flex-col items-center justify-center">
          <SearchBar setResults={setResults} setIsActive={setIsActive} />
          <SearchResults results={results} isActive={isActive} />
        </div>
        </div>
      )}
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between bg-white h-[74px] px-4 md:px-8">
        <ul className="flex items-center gap-8 text-[#636270] font-semibold">
          <Link href={`/`}>
            <li className="cursor-pointer hover:text-customGreen duration-200">
              Home
            </li>
          </Link>
          <Link href={`/product`}>
            <li className="cursor-pointer hover:text-customGreen duration-200">
              Product
            </li>
          </Link>
          <Link href={`/component/About`}>
            <li className="cursor-pointer hover:text-customGreen duration-200">
              About
            </li>
          </Link>
          <Link href={`/component/Contact`}>
            <li className="hover:text-customGreen">Contact</li>
          </Link>
        </ul>
        <div>
          <span className="text-[#636270]">Contact:</span>
          <span>(808) 555-0111</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
