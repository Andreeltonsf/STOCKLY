"use client"


import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-acess/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/current";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";



export const saleTableColumns: ColumnDef<SalesDto>[] = [
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
    cell: () => <Button><MoreHorizontalIcon size={16} />Editar</Button>,
  }
]