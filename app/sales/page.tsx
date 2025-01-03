
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/Header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sales/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";


const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    productOptions,
    products,
  }));



  return (
    <div className="w-full space-y-8 p-8 bg-white rounded-lg ml-8 mt-8 px-8 py-8" >
          
             <Header>
               <HeaderLeft> 
                <HeaderSubtitle>Vendas</HeaderSubtitle>
                 <HeaderTitle>Lista de vendas</HeaderTitle>
                
               </HeaderLeft>
               <HeaderRight>
                 <UpsertSaleButton products={products} productOptions={productOptions}   />
               </HeaderRight>
             </Header>

            <DataTable columns={saleTableColumns} data={tableData} />

    </div>
  );
};

export default SalesPage;
