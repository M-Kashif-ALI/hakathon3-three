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
  const [products, setProducts] = useState<productTypes[]>([]);
  const [categories, setCategories] = useState<categoryTypes[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<productTypes[]>([]);
  const { add } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: IProduct[] = await getAllProducts();
        const transformedProducts = fetchedProducts.map((item) => ({
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
        setProducts(transformedProducts);

        // Extract unique categories with images
        const uniqueCategories = Array.from(
          new Map(
            transformedProducts.map((item) => [item.category, item.categoryImg])
          ).entries()
        ).map(([name, image]) => ({ name, image }));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const query = `*[_type == "products" && "featured" in tags] | order(_createdAt asc) {
          _id,
          title,
          tags,
          price,
          "category": category->title,
          "categoryImg": category->image.asset->url,
          inventory,
          description,
          "imageurl": image.asset->url,
          "slug": slug.current
        }`;
        const fetchedFeaturedProducts = await client.fetch(query);
        setFeaturedProducts(fetchedFeaturedProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="bg-white text-black md:px-16 px-4 pt-24">
      <section>
        {/* Featured Products */}
        <h1 className="text-gray-800 text-4xl font-bold mb-2">
          Featured Products
        </h1>
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {featuredProducts.map((product) => (
            <div key={product._id} className="max-w-xs">
              <Link
                href={`/product/${product._id}`}
                aria-label={`View details for ${product.title}`}
              >
                <div>
                  <Image
                    src={product.imageurl}
                    alt={`Image of ${product.title}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded object-cover h-64 w-64"
                  />
                </div>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-gray-800 text-sm hover:text-teal-600 transition">
                      {product.title}
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                      ${product.price}
                    </p>
                  </div>
                  <button
                    aria-label={`Add ${product.title} to cart`}
                    className="h-11 w-11 rounded-md bg-gray-200 hover:bg-teal-600 hover:text-white flex items-center justify-center transition"
                    onClick={() => add({ ...product, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </button>
                </div>
              
            </div>
          ))}
        </div>

        {/* Top Categories */}
        <h1 className="text-gray-800 text-4xl font-bold mt-10">
          Top Categories
        </h1>
        <div className="flex flex-wrap gap-6 mt-4 justify-around">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-gray-800 rounded-md overflow-hidden w-[300px]"
            >
              <Link
                href={`/category/${encodeURIComponent(category.name)}`}
                aria-label={`View products in ${category.name}`}
              >
                <Image
                  src={category.image}
                  alt={`Category: ${category.name}`}
                  width={300}
                  height={300}
                  loading="lazy"
                  className="rounded object-cover"
                />
                <p className="bg-black text-white font-semibold p-2 rounded-b-md text-center">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* Selected Products */}
        <h1 className="text-gray-800 text-4xl font-bold mt-10">
          Our Products
        </h1>
        <div className="flex flex-wrap gap-6 items-center justify-center mt-4">
          {products.slice(0, 9).map((product) => (
            <div key={product._id} className="max-w-xs">
              <Link
                href={`/product/${product._id}`}
                aria-label={`View details for ${product.title}`}
              >
                <div>
                  <Image
                    src={product.imageurl}
                    alt={`Image of ${product.title}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded object-cover h-64 w-64"
                  />
                </div>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-gray-800 text-sm hover:text-teal-600 transition">
                      {product.title}
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                      ${product.price}
                    </p>
                  </div>
                  <button
                    aria-label={`Add ${product.title} to cart`}
                    className="h-11 w-11 rounded-md bg-gray-200 hover:bg-teal-600 hover:text-white flex items-center justify-center transition"
                    onClick={() => add({ ...product, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </button>
                </div>
              
            </div>
          ))}
        </div>

        {/* All Products */}
        <h1 className="text-gray-800 text-4xl font-bold mt-10">
          All Products
        </h1>
        <div className="flex flex-wrap gap-6 items-center justify-center mt-4">
          {products.map((product) => (
            <div key={product._id} className="max-w-xs">
              <Link
                href={`/product/${product._id}`}
                aria-label={`View details for ${product.title}`}
              >
                <div>
                  <Image
                    src={product.imageurl}
                    alt={`Image of ${product.title}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded object-cover h-64 w-64"
                  />
                </div>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-gray-800 text-sm hover:text-teal-600 transition">
                      {product.title}
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                      ${product.price}
                    </p>
                  </div>
                  <button
                    aria-label={`Add ${product.title} to cart`}
                    className="h-11 w-11 rounded-md bg-gray-200 hover:bg-teal-600 hover:text-white flex items-center justify-center transition"
                    onClick={() => add({ ...product, quantity: 1 })}
                  >
                    <RiShoppingCartFill className="text-lg" />
                  </button>
                </div>
              
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
