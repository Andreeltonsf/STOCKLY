
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Trash2Icon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon } from "lucide-react";
import DeleteAlertDialog from "./delete-dialog";
import UpsertProductDialogContent from "./upsert-product-dialog";
import { useState } from "react";
import { Product } from "@prisma/client";

interface ProductTableDropdownMenuProps {
  product: Product;
}

const ProductDropdown = ({product}: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
 
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
           setDialogIsOpen={setEditDialogOpen}
        
        />
        <DeleteAlertDialog id={product.id}/>
        </Dialog>
      </AlertDialog>
      )
    
}


export default ProductDropdown
