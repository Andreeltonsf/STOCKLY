"use client"

import ProductStatusBadge from "@/app/_components/product-status-badge"
import { ProductDto } from "@/app/_data-acess/product/get-products"
import { ColumnDef } from "@tanstack/react-table"
import ProductDropdown from "./product-dropdawn"


export type Payment = {
  id: string
  amount: number
  status: "pending" |"processing" | "success" | "failed"
  email: string
}



export const ProductsTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey:"name",
    header: "Nome",
  },
  {
    accessorKey:"price",
    header: "Valor Unitário",
  },
  {
    accessorKey:"stock",
    header: "Estoque", 
  },
  {
    accessorKey:"status", 
    header: "Status",
    cell: ({row:{original:product}}) => {
      
      
      
      return (
        <ProductStatusBadge status={product.status} />
      )

    }
  }, 
  {
    accessorKey:"actions",
    header: "Ações",
    cell:(row) => <ProductDropdown product={row.row.original}/>
  }
]

