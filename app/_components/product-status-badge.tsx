import {ProductStatus } from "../_data-acess/product/get-products";
import { Badge } from "./ui/badge";

const getStatusLabel = (status:string) => {
  if(status === 'IN_STOCK') {return 'Em Estoque'}

  return 'Fora de Estoque'
}

interface ProductStatusBadgeProps {
  status: ProductStatus;
}


const ProductStatusBadge = ({status}: ProductStatusBadgeProps) => {

  const label = getStatusLabel(status);
  return (

    <Badge variant={label === 'Em Estoque'? 'default' :'outline'  }  className="gap-1.5">
        {label}
    </Badge>

  )
}



export default ProductStatusBadge;

