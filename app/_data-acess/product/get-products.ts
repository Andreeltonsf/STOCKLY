import { db } from "@/app/_lib/prisma"
import { Product } from "@prisma/client"
import { unstable_cache } from "next/cache";
import "server-only"


export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({})
  return products
};


export const cachedGetProducts = unstable_cache(getProducts,['getProducts'],{
  tags: ['get-Products'],
  revalidate:10,
})
