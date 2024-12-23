"use client";


import { createSale } from "@/app/_actions/sales/create-sale";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../_components/ui/sheet";
import { formatCurrency } from "../../_helpers/current";
import SalesTableDropdownMenu from "./table-dropdown-menu";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().min(1).positive(),
  
})


type FormSchema = z.infer<typeof formSchema>;


interface UpsertSheetContentProps{
  products: Product[];
  productOptions: ComboboxOption[];
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectedProduct{
  id: string;
  name: string;
  price: number;
  quantity: number; 
}


const UpsertSheetContent = ({products, productOptions, setSheetIsOpen}: UpsertSheetContentProps) => {

  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  }
  );
const onSubmit = (data: FormSchema) => {
  const selectedProduct = products.find((product) => product.id === data.productId);
  if(!selectedProduct) return;

  setSelectedProduct((currentProducts) => {
    const existingProduct = currentProducts.find(
      (products) => products.id === selectedProduct.id,
    );
    if (existingProduct) {
      const productIsOutOfStock =
        existingProduct.quantity + data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      form.reset();
      return currentProducts.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            quantity: product.quantity + data.quantity,
          };
        }
      });
    }
    const productIsOutOfStock = data.quantity > selectedProduct.stock;
    if(productIsOutOfStock ){
      form.setError("quantity", {
        message:"O estoque do produto é insuficiente."});
        return currentProducts;
    } form.reset()
    return [...currentProducts, {...selectedProduct,price: Number(selectedProduct.price), quantity: data.quantity}]
  });

  form.reset();

}

const productsTotal = useMemo(() => {
  return selectedProduct.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
},[selectedProduct]);



const handleDeleteProduct = (productId: string) => {
  setSelectedProduct((currentProducts) => {
    return currentProducts.filter((product) => product.id !== productId);
  });
};


const onSubmitSale = async () => {
  try{
    await createSale({
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
    toast.success("Venda salva com sucesso.");
    setSheetIsOpen(false);


  }catch(error){
    toast.error("Ocorreu um erro ao salvar a venda.");
  } 
};

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                  <SalesTableDropdownMenu product={product} onDelete={handleDeleteProduct}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button className="w-full gap-2" disabled={productsTotal === 0} onClick={onSubmitSale} >
          <CheckIcon size={20}/>
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
