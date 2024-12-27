import { deleteProduct } from "@/app/_actions/product/delete-product"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

interface DeleteProductProps {
  id: string
}

const DeleteAlertDialog = ({ id: productId }: DeleteProductProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto excluído com sucesso")
    },
    onError: () => {
      toast.error("Erro ao excluir o produto")
    },
  })

  const handleContinueClick = () => {
    executeDeleteProduct({ id: productId })
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
        <AlertDialogAction onClick={handleContinueClick}>Excluir</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteAlertDialog
