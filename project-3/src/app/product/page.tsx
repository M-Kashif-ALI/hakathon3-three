"use client";

import { getAllProducts, IProduct } from "@/sanity/lib/data";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context";
import Image from "next/image";
import { RiShoppingCartFill } from "react-icons/ri";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
interface productTypes {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  inventory: number;
  category: string;
  categoryImg: string;
  description: string;
  imageurl: string;
  quantity: number;
  slug: string;
}

interface categoryTypes {
  name: string;
  image: string;
}

const Product = () => {
  const [product, setProduct] = useState<productTypes[]>([]);
  const [categories, setCategories] = useState<categoryTypes[]>([]);
  const { add } = useContext(CartContext);
  const [NProduct, setNProduct] = useState<productTypes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const FProducts: IProduct[] = await getAllProducts();

      const transformedProducts: productTypes[] = FProducts.map((item) => ({
        _id: item._id,
        title: item.title,
        tags: item.tags || [],
        price: item.price,
        category: item.category,
        categoryImg: item.categoryImg,
        inventory: item.inventory || 0,
        description: item.description || "",
        imageurl: item.imageurl || "",
        quantity: 0,
        slug: item.slug,
      }));

      setProduct(transformedProducts);

      // Group categories with their images
      const uniqueCategories = Array.from(
        new Map(
          transformedProducts.map((item) => [item.category, item.categoryImg])
        ).entries()
      ).map(([name, image]) => ({ name, image }));

      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const NProducts = async () => {
      try {
        const featured = `*[_type == "products" && "featured" in tags] | order(_createdAt asc) {
          _id,
          title,
            tags,
            price,
            "category": category->title,
            "categoryImg": category->image.asset -> url,
            inventory,
            description,
            'imageurl': image.asset -> url,
            "slug": slug.current
        }`;
        const nProducts = await client.fetch(featured);
        setNProduct(nProducts);
      } catch (error) {
        console.log(error);
      }
    };
    NProducts();
  });

  return (
    <main className="bg-white text-black md:px-[60px] px-[10px] py-[30px] mt-[190px]">
      <section>
        <h1 className="text-[#272343] text-[32px] font-semibold">
          Featured Products
        </h1>

        <div className="flex gap-5 flex-wrap items-center justify-center">
          {NProduct.map((featured, i) => (
            <div key={i}>
              <Link href={`/product/${featured._id}`}>
                <div>
                  <Image
                    src={featured.imageurl}
                    alt={featured.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded h-[260] w-[260px]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#272343] text-sm hover:text-[#029FAE] duration-200">
                      {featured.title}
                    </p>
                    <p className="text-[#272343] text-lg">${featured.price}</p>
                  </div>

                  <div
                    className="h-[44px] w-[44px] rounded-md cursor-pointer my-5 duration-200 flex items-center justify-center bg-[#F0F2F3] hover:bg-[#029FAE] hover:text-white"
                    onClick={() => add({ ...featured, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <h1 className="text-[#272343] text-[32px] font-semibold">
          Top Categories
        </h1>
        <div className="flex flex-col md:flex-row gap-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-[#272343] rounded-md overflow-hidden"
            >
              <Link href={`/category/${encodeURIComponent(category.name)}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={424}
                  height={424}
                  loading="lazy"
                  className="h-[424px] w-[424px] object-cover"
                />
                <p className="text-white font-semibold relative bg-black/85 backdrop:blur-sm bottom-[80px] h-[85px] pl-3 pt-7 rounded-md">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <h1 className="text-[#272343] text-[32px] font-semibold">
          Our Products
        </h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {product.slice(5, 14).map((prd) => (
            <div key={prd._id}>
              <Link href={`/product/${prd._id}`}>
                <div>
                  <Image
                    src={prd.imageurl}
                    alt={prd.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded h-[260] w-[260px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#272343] text-sm hover:text-[#029FAE] duration-200">
                      {prd.title}
                    </p>
                    <p className="text-[#272343] text-lg">${prd.price}</p>
                  </div>
                  <div
                    className="h-[44px] w-[44px] rounded-md cursor-pointer my-5 duration-200 flex items-center justify-center bg-[#F0F2F3] hover:bg-[#029FAE] hover:text-white"
                    onClick={() => add({ ...prd, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>


        <h1 className="text-[#272343] text-[32px] font-semibold">
          Our All Products
        </h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {product.map((prd) => (
            <div key={prd._id}>
              <Link href={`/product/${prd._id}`}>
                <div>
                  <Image
                    src={prd.imageurl}
                    alt={prd.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded h-[260] w-[260px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#272343] text-sm hover:text-[#029FAE] duration-200">
                      {prd.title}
                    </p>
                    <p className="text-[#272343] text-lg">${prd.price}</p>
                  </div>
                  <div
                    className="h-[44px] w-[44px] rounded-md cursor-pointer my-5 duration-200 flex items-center justify-center bg-[#F0F2F3] hover:bg-[#029FAE] hover:text-white"
                    onClick={() => add({ ...prd, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
