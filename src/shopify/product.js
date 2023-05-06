import fetch from "node-fetch";
import * as dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

export const getProduct = async (req, res) => {
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
  const reducedProduct = {
    id: response.product.id,
    title: response.product.title,
    body_html: response.product.body_html,
    variants: response.product.variants,
    images: response.product.images,
    options: response.product.options,
  };

  return res.status(200).json(reducedProduct);
}