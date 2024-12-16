"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductsSchema, CreateProductSchema } from "./schema";




export const createProducts = async( data: CreateProductSchema) => {
    
  createProductsSchema.parse(data)
  
  await db.product.create({ 
      data,
    })

    revalidatePath("/products")
}
