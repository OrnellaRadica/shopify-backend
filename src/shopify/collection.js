import fetch from "node-fetch";
import { TOKEN } from "../config.js";

export const getCollection = async (req, res) => {
  try {
    const route =
      "https://test-fullstack.myshopify.com/admin/api/2023-04/products.json";

    if (!TOKEN) return res.status(401).send({ message: "Missing token" });

    const response = await fetch(route, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    
    if (response.errors) {
      throw new Error(response.errors);
    }

    const reducedProducts = response.products.map((product) => ({
      id: product.id,
      image: product.image,
      title: product.title,
      variants: product.variants,
      images: product.images,
    }));

    return res.status(200).json({
      products: reducedProducts,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
