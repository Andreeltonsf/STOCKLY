import { z } from "zod";

export const createProductsSchema = z.object({
  name: z.string().trim().min(1,{
    message: "O nome do produto é obrigatório",
  }),
  price: z.number().min(0.01,{
    message: "O preço do produto é obrigatório",
  }),
  stock: z.coerce.number().positive({
    message: "O estoque do produto é obrigatório",
  }).min(0,{
    message: "O estoque do produto é obrigatório",
  }),

});

export type CreateProductSchema = z.infer<typeof createProductsSchema>;
