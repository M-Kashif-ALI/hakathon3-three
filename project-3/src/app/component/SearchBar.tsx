"use client";

import { client } from "@/sanity/lib/client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Product {
  _id: string;
  title: string;
}

interface SearchBarProps {
  setResults: (results: Product[]) => void;
  setIsActive: (isActive: boolean) => void; // Add this prop to notify parent component
}

const SearchBar = ({ setResults, setIsActive }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    try {
      const searchQuery = `*[_type == "products"]{
        _id,
        title
      }`;

      const products = await client.fetch(searchQuery);

      const filteredResults = products.filter((product: Product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      fetchData(value);
      setIsActive(true); // Set isActive to true when there's input
    } else {
      setResults([]);
      setIsActive(false); // Set isActive to false when input is cleared
    }
  };

  return (
    <div
      className="bg-white flex gap-2 pl-2 items-center rounded-lg h-[40px] w-[100%] shadow-md"
      role="search"
      aria-label="Search products"
    >
      <FaSearch className="text-blue-700" aria-hidden="true" />
      <input
        type="search"
        placeholder="Type to search products..."
        aria-label="Search for products"
        className="pl-2 text-cyan-500 focus:outline-none w-[90%] text-lg"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
