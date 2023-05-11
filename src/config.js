import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3001
export const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN