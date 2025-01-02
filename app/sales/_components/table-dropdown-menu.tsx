import { deleteSale } from "@/app/_actions/sales/delete-sale"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog"
import { Button } from "@/app/_components/ui/button"
import { ComboboxOption } from "@/app/_components/ui/combobox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { ProductDto } from "@/app/_data-acess/product/get-products"
import { SalesDto } from "@/app/_data-acess/sales/get-sales"
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { toast } from "sonner"
import UpsertSheetContent from "./upsert-sheet-content"



interface SalesTableDropdownMenuProps {
  sales: Pick<SalesDto, "id" |"saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropdownMenu = ({sales, productOptions, products}: SalesTableDropdownMenuProps) => {

  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false)

  const {execute} = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluída com sucesso")
    },
    onError: () => {
      toast.error("Erro ao excluir a venda")
    },
  })

  const handleCopySaleId = () => {
    navigator.clipboard.writeText(sales.id)
    toast.success("ID da venda copiado para a área de transferência")
  }

  const handleConfirmDeleteClick = () => execute({id: sales.id})
    


  return (    
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent>
          
            <DropdownMenuItem className="gap-1.5" onClick={handleCopySaleId }>
              <ClipboardCopyIcon size={16} /> 
              Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild> 
              <DropdownMenuItem className="gap-1.5" >
                <EditIcon size={16}/>
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            
             
                <AlertDialogTrigger asChild>
            
                  <DropdownMenuItem className="gap-1.5">
                         <Trash2Icon size={16}/>
                          Excluir
                    </DropdownMenuItem>

                </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
    
        <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Excluir Venda</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir está venda?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirmDeleteClick}>Excluir</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
        
      </AlertDialog>

      <UpsertSheetContent 
      saleId={sales.id}
      productOptions={productOptions} 
      products={products} 
      setSheetIsOpen={setUpsertSheetIsOpen}
      defaultSelectedProducts={sales.saleProducts.map(saleProduct => ({
        id: saleProduct.productId,
        name:saleProduct.productName,
        price: saleProduct.unitPrice,
        quantity: saleProduct.quantity,
      }))}
      />

    </Sheet>
  )
}

export default SalesTableDropdownMenu
