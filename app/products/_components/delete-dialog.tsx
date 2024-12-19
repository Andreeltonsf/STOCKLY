import { deleteProduct } from "@/app/_actions/product/delete-product"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog"
import { toast } from "sonner"


interface DeleteProductProps {
  id: string
}

const DeleteAlertDialog = ({id: productId}:DeleteProductProps) => {

  const HandleContinueClick = async () => {
    try{
      await deleteProduct({id:productId})
      toast.success('Produto excluído com sucesso')
    }catch(error){
      toast.error('Erro ao excluir o produto')
      console.error(error)
    }
    
  }
  return (
    <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={HandleContinueClick}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
     
  )

}


export default DeleteAlertDialog
