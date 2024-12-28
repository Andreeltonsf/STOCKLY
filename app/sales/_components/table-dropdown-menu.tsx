import { deleteSale } from "@/app/_actions/sales/delete-sale"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog"
import { Button } from "@/app/_components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu"
import { Sale } from "@prisma/client"
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"



interface SalesTableDropdownMenuProps {
  sales: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({sales}: SalesTableDropdownMenuProps) => {

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
            
              <DropdownMenuItem className="gap-1.5" >
                <EditIcon size={16}/>
                Editar
              </DropdownMenuItem>
            
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
      
  )
}

export default SalesTableDropdownMenu
