import { z } from "zod";





export const upsertSaleSchema =z.object({
  id:z.string().uuid().optional(),
  products:z.array(
      z.object({
        id:z.string().uuid(),
        quantity:z.number().int().min(1).positive()

  }))
})


export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;
