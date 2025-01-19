import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  params: { category: string };
}

const CategoryPage = async ({ params }: ProductProps) => {
  // Decode the category name to handle URL encoding
  const category = decodeURIComponent(params.category);

  // Fetch products for the selected category
  const products = await client.fetch(
    `*[_type == "products" && category->title == $category] | order(_createdAt asc) {
      _id,
      title,
      tags,
      price,
      inventory,
      description,
      'imageurl': image.asset->url,
      'category': category->title,
      'slug': slug.current
    }`,
    { category }
  );

  return (
    <main className="bg-white text-black md:px-[60px] px-[10px] py-[30px] md:mt-[190px]">
      <h1 className="text-[#272343] text-[32px] font-semibold">
        Products in {category}
      </h1>
      <div className="flex gap-5 flex-wrap justify-center">
        {products.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          products.map((prd: any) => (
            <div key={prd._id}>
              <Link href={`/product/${prd.slug}`}>
                <div>
                  <Image
                    src={prd.imageurl}
                    alt={prd.title}
                    width={500}
                    height={500}
                    className="rounded-lg h-[260] w-[260px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex gap-2 justify-center my-3">
                      {prd.tags?.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-[#F0F2F3] text-[#029FAE] text-sm px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 items-center w-[100%]">
                      <p className="text-[#272343] font-semibold hover:text-[#029FAE] duration-200">
                        {prd.title}
                      </p>
                      <p className="text-[#272343] text-lg font-bold">
                        ${prd.price}
                      </p>
                    </div>
                    <p className="text-[#029FAE] text-sm">
                      Category: {prd.category}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-[#272343] text-lg">
            No products found for this category.
          </p>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
