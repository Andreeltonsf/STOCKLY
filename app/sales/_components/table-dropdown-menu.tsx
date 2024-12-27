"use client"

import { Button } from "@/app/_components/ui/button"
import { DropdownMenuContent, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu"
import { Product } from "@prisma/client"

import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ClipboardCopyIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"


interface ProductTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdownMenu = ({product, onDelete}: ProductTableDropdownMenuProps) => {
  return (

    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent>
      
        <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(product.id)}>
          <ClipboardCopyIcon size={16} /> 
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1.5" onClick={()=> onDelete(product.id)}>
            <Trash2Icon size={16}/>
                      Excluir
        </DropdownMenuItem>

            
      </DropdownMenuContent>
    </DropdownMenu>
   )}


export default SalesTableDropdownMenu 
