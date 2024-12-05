import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { ProductsTableColumns } from "./_components/table-columns";

const ProductsPages = async () => {
  const products = await db.product.findMany();
  return (
    <div className="w-full space-y-8 p-8 bg-white rounded-lg ml-8 mt-8 px-8 py-8" >
      
         <div className="flex w-full items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Produtos</h2>
              <span className="text-xs font-semibold text-slate-500">Gestão de Produtos</span>
              
              
            </div>
            <Button className="gap-2">
              <PlusIcon size={20} />
              Novo Produto
            </Button>
         </div>
         <DataTable columns={ProductsTableColumns} data={products} />
    </div>
  );
};

export default ProductsPages;
