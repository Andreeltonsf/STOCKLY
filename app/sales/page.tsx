
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sales/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";


const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));





  return (
    <div className="w-full space-y-8 p-8 bg-white rounded-lg ml-8 mt-8 px-8 py-8" >
          
             <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Vendas</h2>
                  <span className="text-xs font-semibold text-slate-500">Gestão de Vendas</span>
                  
                  
                </div>
                <CreateSaleButton products={products} productOptions={productOptions}/>
             </div>

            <DataTable columns={saleTableColumns} data={sales} />

        </div>
  );
};

export default SalesPage;
