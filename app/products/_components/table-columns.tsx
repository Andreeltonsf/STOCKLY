"use client"

import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import DeleteAlertDialog from "./delete-dialog"
import UpsertProductDialogContent from "./upsert-product-dialog"
import { useState } from "react"
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
    cell:(row) =>{
      const [editDialogOpen, setEditDialogOpen] = useState(false)
      const product = row.row.original
      return ( 
        
      <AlertDialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent>
          
            <DropdownMenuItem className="gap-1.5">
              <ClipboardCopyIcon size={16} onClick={() => navigator.clipboard.writeText(product.id)}/> 
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5" >
                <EditIcon size={16}/>
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
                <AlertDialogTrigger asChild>
            
                  <DropdownMenuItem className="gap-1.5">
                         <Trash2Icon size={16}/>
                          Excluir
                    </DropdownMenuItem>

                </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductDialogContent defaultValues={{
          id: product.id,
          name: product.name,
          price: Number(product.price),
          stock: product.stock,
        }}
            onSuccess={() => setEditDialogOpen(false)}
        
        />
        <DeleteAlertDialog id={product.id}/>
        </Dialog>
      </AlertDialog>
        
    

      );
    }
  }
]
