import React from "react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
}

interface SearchResultsProps {
  results: Product[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <section
      className="bg-white flex flex-col shadow rounded-md mt-[15px] max-h-[200px] overflow-y-scroll z-20 absolute w-[300px] top-[100px]"
      aria-label="Search Results"
      role="listbox" 
    >
      {results.length > 0 ? (
        results.map((result) => (
          <Link key={result._id} href={`/product/${result._id}`} passHref>
            <div
              className="pb-2 border-b px-2 pt-1 duration-200 hover:bg-blue-400 cursor-pointer"
              role="option"
              aria-selected="false" 
              tabIndex={0}
            >
              {result.title}
            </div>
          </Link>
        ))
      ) : (
        <></>
      )}
    </section>
  );
};
