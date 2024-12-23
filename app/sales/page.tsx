
import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetContent, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-acess/product/get-products";
import UpsertSheetContent from "./_components/upsert-sheet-content";


const SalesPage = async () => {
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      Adicionar uma venda
                    </Button>
                  </SheetTrigger>

                  <SheetContent>
                    <UpsertSheetContent products={products} productOptions={productOptions}  />
                  </SheetContent>
                </Sheet>
             </div>
            
            
        </div>
  );
};

export default SalesPage;
