"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

// Exemplo de um tipo que a lib "next-safe-action" pode exigir
type SafeActionResult<T> = {
  data?: T;
  error?: string;
};

export async function upsertProduct(
  data: UpsertProductSchema
): Promise<SafeActionResult<{ success: boolean }> | undefined> 
{
  try {
    upsertProductSchema.parse(data);

    await db.product.upsert({ 
      where: { id: data.id ?? "" },
      update: {
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
      create: {
        name: data.name,
        price: data.price,  
        stock: data.stock,
      },
    });

    revalidatePath("/products");

    return {
      data: { success: true }
    };

  } catch (err) {
    
    return {
      error: "Falha ao atualizar produto"
    };
  }
}
