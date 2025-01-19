"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/sanity/lib/client";
import { RiShoppingCartFill } from "react-icons/ri";
import { CartContext } from "@/app/context";
import { getAllProducts, IProduct } from "@/sanity/lib/data";
import Link from "next/link";

export interface types {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  category: string;
  categoryImg: string;
  inventory: number;
  description: string;
  imageurl: string;
}

export interface Featuretypes {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  category: string;
  categoryImg: string;
  inventory: number;
  description: string;
  imageurl: string;
  slug: string;
}

const ProductPage = ({ params }: { params: { product_page: string } }) => {
  const { add } = useContext(CartContext);
  const [product, setProduct] = useState<types | null>(null);

  const [featrePrd, setfeatrePrd] = useState<Featuretypes[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const featured = `*[_type == "products" && slug.current=="${params.product_page}"] | order(_createdAt asc) {
          _id,
          title,
          tags,
          price,
          "category": category->title,
          "categoryImg": category->image.asset->url,
          inventory,
          description,
          'imageurl': image.asset->url,
          "slug": slug.current
        }`;
        const products = await client.fetch(featured);
        console.log("Fetched Product:", products);
        setProduct(products[0]);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchPosts();
  }, [params.product_page]);

  useEffect(() => {
    const featuredPrd = async () => {
      const FProducts: IProduct[] = await getAllProducts();
      setfeatrePrd(FProducts);
    };
    featuredPrd();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-white pt-[200px]">
      <div className="flex gap-10 px-10">
        <div className="basis-[50%]">
          <Image
            src={product.imageurl}
            alt={product.title}
            height={607}
            width={675}
            className="w-[600px] h-[550px] rounded-3xl"
          />
        </div>
        <div className="text-[#272343] basis-[50%]">
          <p className="text-[60px] font-bold">{product.title}</p>
          <p className="text-white bg-[#029FAE] h-[44px] w-[144px] rounded-full flex items-center justify-center font-[600] text-[20px]">
            ${product.price} USD
          </p>
          <p className="text-[#272343] text-[22px] border-t mt-4 pt-4">
            {product.description}
          </p>
          <p className="text-[#272343] text-[22px] border-t mt-4 pt-4 flex gap-3">
            <span>Stock Level:</span>
            <span>{product.inventory}</span>
          </p>
          <div
            className="rounded-md cursor-pointer my-5 flex items-center justify-evenly bg-[#029FAE] h-[63px] w-[212px] text-white hover:bg-[#23bdcb] duration-200"
            onClick={() => add({ ...product, quantity: 1 })}
          >
            <RiShoppingCartFill className="text-lg" />
            <span className="capitalize font-semibold">add to cart</span>
          </div>
        </div>
      </div>

      <div className="px-7">
        <h1 className="text-[#272343] text-[32px] font-semibold pt-[90px] pb-[40px] flex justify-between items-center">
          Featured Products
          <span className="underline underline-offset-2 font-bold text-[18px]">
            View All
          </span>
        </h1>
        <div className="flex flex-wrap justify-around gap-5">
          {featrePrd.slice(5, 11).map((prd) => (
            <div key={prd._id}>
              <Link href={`/product/${prd.slug}`}>
                <div>
                  <Image
                    src={prd.imageurl}
                    alt={prd.title}
                    width={500}
                    height={500}
                    className="h-[260] w-[260px] rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[#272343] mt-5 mx-2">
                    <p>{prd.title}</p>
                    <p className="font-bold">${prd.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
