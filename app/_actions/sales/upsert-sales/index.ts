"use server"

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { upsertSaleSchema } from "./schema";


export const upsertSale = actionClient.schema(upsertSaleSchema).action(async({parsedInput: {products,id}}) =>{
 
  const isUpdate = Boolean(id) 

 

  await db.$transaction(async (trx) => {

    if(isUpdate){
        const existingSale = await trx.sale.findUnique({where:{id},include:{products:true}})
            await trx.sale.delete({
              where: {
                id
              },
            });
            if(!existingSale) return;
            for (const product of existingSale?.products) {
                await trx.product.update({
                  where: {
                    id: product.productId,
                  },
                  data: {
                    stock: {
                      decrement: product.quantity,
                    },
                  },
                })
            }
          }

       const sale = await trx.sale.create({
    data: {
      date: new Date(),

    },
  });
  for (const product of products) {
    const productFromDb = ( await trx.product.findUnique({
      where: {
        id: product.id,
      },
    }))

    if (!productFromDb) { 
      returnValidationErrors(upsertSaleSchema, {
        _errors: ["Product not found."],
      });
    }

    const productIsOutOfStock = productFromDb.stock < product.quantity;
    if (productIsOutOfStock) {
      returnValidationErrors(upsertSaleSchema, {
        _errors: ["Product is out of stock."],
      });
    }
    
    await trx.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });

    await trx.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    })
  }

  revalidatePath("/","page")
  })
})
