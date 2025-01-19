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
    const featured = `*[_type == "products"] | order(_createdAt asc) {
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
    const products = await client.fetch(featured);
    return products;
  } catch (error) {
    console.log(error);
  }
};
