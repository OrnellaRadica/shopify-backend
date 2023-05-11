import fetch from "node-fetch";
import { TOKEN } from "../config.js";


export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const route = `https://test-fullstack.myshopify.com/admin/api/2023-04/products/${productId}.json`;

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

    const reducedProduct = {
      id: response.product.id,
      title: response.product.title,
      body_html: response.product.body_html,
      variants: response.product.variants,
      images: response.product.images,
      options: response.product.options,
    };

  return res.status(200).json(reducedProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}