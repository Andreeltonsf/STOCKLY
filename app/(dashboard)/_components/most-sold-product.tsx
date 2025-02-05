import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/current";



interface MostSoldProductProps {
  product: MostSoldProductDto;
}



const MostSoldProductItem = ({product}:MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="space-y-[6px]">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold text-slate-900">{product.name}</p>
        <p className="font-medium text-slate-500">{formatCurrency(Number(product.price))}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">{product.totalSold}  vendidas</p>
      </div>

    </div>
  )
}


export default MostSoldProductItem
