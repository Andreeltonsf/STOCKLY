"use client"


import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-acess/product/get-products";
import { SalesDto } from "@/app/_data-acess/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/current";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";

interface SalesTableColumns extends SalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SalesTableColumns>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
    
  },
  {
   
    header: "Valor Total",
    cell: ({row:{original:{totalAmount}}}) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell:({row:{original:{date}}}) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({row:{original:sale}}) => <SalesTableDropdownMenu sales={sale} productOptions={sale.productOptions} products={sale.products}/>,
  }
]
