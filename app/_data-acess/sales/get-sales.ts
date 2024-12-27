import { db } from "@/app/_lib/prisma";
import "server-only";



export interface SalesDto{
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
 

}
export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: { products: {
      include: { product: true },
    }},
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products.map(saleProduct => saleProduct.product.name).join(", "),
    totalProducts: sale.products.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0
    ),
    totalAmount: sale.products.reduce(
      (acc, saleProduct) =>
        acc + Number(saleProduct.unitPrice) * saleProduct.quantity,
      0
    ),
  }));
};

