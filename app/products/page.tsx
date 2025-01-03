import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/Header";
import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-acess/product/get-products";
import { AddProductButton } from "./_components/add-product-button";
import { ProductsTableColumns } from "./_components/table-columns";


const ProductsPages = async () => {

  const products = await cachedGetProducts();
  return (
    <div className="w-full space-y-8 p-8 bg-white rounded-lg ml-8 mt-8 px-8 py-8" >
      <Header>
        <HeaderLeft>
         <HeaderSubtitle>Produtos</HeaderSubtitle>
         <HeaderTitle>Lista de produtos</HeaderTitle>
       </HeaderLeft>
        <HeaderRight>
          <AddProductButton />
        </HeaderRight>
      
    </Header>
        
         <DataTable columns={ProductsTableColumns} data={products} />
    </div>
  )
};

export default ProductsPages;
