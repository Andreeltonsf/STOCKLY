"use client"

import { Badge } from "@/app/_components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import ProductDropdown from "./product-dropdawn"
import { Product } from "@prisma/client"


export type Payment = {
  id: string
  amount: number
  status: "pending" |"processing" | "success" | "failed"
  email: string
}


const getStatusLabel = (status:string) => {
  if(status === 'IN_STOCK') {return 'Em Estoque'}

  return 'Fora de Estoque'
}


export const ProductsTableColumns: ColumnDef<Product>[] = [
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
    cell: (row) => {
      const product = row.row.original
      
      const label = getStatusLabel(product.status)
      return (
      <Badge variant={label === 'Em Estoque'? 'default' :'outline'  }  className="gap-1.5">
        <CircleIcon className={`${label} === 'Em estoque`? 'fill-primary-foreground' : 'fill-destructive-foreground'}size={14}/>
        {label}
        </Badge>)

    }
  }, 
  {
    accessorKey:"actions",
    header: "Ações",
    cell:(row) => <ProductDropdown product={row.row.original}/>
  }
]

