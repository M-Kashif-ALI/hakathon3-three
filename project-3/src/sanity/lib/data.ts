import { client } from "./client";

export interface IProduct {
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

export const getAllProducts = async () => {
  try {
    const query = `
      *[_type == "products"] | order(_createdAt asc) {
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
      }
    `;
    const products = await client.fetch(query);
    return products.map((product: IProduct) => ({
      ...product,
      slug: product.slug || null, // Handle missing slug
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};