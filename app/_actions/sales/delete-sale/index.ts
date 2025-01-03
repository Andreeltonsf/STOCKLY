"use server"

import { db } from "@/app/_lib/prisma"
import { actionClient } from "@/app/_lib/safe-action"
import { revalidatePath } from "next/cache"
import { deleteSaleSchema } from "./schema"




export const deleteSale = actionClient.schema(deleteSaleSchema).action(async ({parsedInput: {id}}) => {


  await db.$transaction(async (trx) => {

  const sale = await trx.sale.findUnique({
    where:{
      id,
    },
    include:{
      products:true,
    }
  });

  if(!sale) return;

  await trx.sale.delete({
    where:{
      id,
    },
  });

  for (const product of sale.products) {
    await trx.product.update({
      where:{
        id: product.productId,
      },
      data:{
        stock:{
          decrement: product.quantity,
        },
      },
     
   }) 
}

  }
  )


  revalidatePath("/","layout")
})



