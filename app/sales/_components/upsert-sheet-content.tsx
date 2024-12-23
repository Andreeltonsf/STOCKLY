"use client";


import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { PlusIcon, Table } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../_components/ui/sheet";
import { formatCurrency } from "../../_helpers/current";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().min(1).positive(),
  
})


type FormSchema = z.infer<typeof formSchema>;


interface UpsertSheetContentProps{
  products: Product[];
  productOptions: ComboboxOption[]
}

interface SelectedProduct{
  id: string;
  name: string;
  price: number;
  quantity: number    
}


const UpsertSheetContent = ({products, productOptions}: UpsertSheetContentProps) => {

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
    const existingProduct = currentProducts.find((product) => product.id === selectedProduct.id);
    if (existingProduct) {
      return currentProducts.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            quantity: product.quantity + data.quantity,
          };
        }
        return product;
      });
    }
    return [...currentProducts, {...selectedProduct,price: Number(selectedProduct.price), quantity: data.quantity}]
  })

  form.reset()

}

const productsTotal = useMemo(() => {
  return selectedProduct.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
},[selectedProduct]);


  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Adicionar venda</SheetTitle>
          <SheetDescription>
            Insira as informações da venda abaixo.
          </SheetDescription>
      </SheetHeader>
          <Form {...form}>
            <form className="py-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                control={form.control}
                name="productId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Combobox placeholder="Selecione um produto" options={productOptions}  {...field} />
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
                        <Input {...field} type="number"  placeholder="Quantidade"  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    )}
              />

              <Button className="w-full gap-2 " variant="secondary" type="submit">
                <PlusIcon size={20} />
                Adicionar produto à venda

              </Button>
            </form>
          </Form>

          <Table>
          <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Produto</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProduct.map((product) => (
              <TableRow key={product.id}>
                <TableCell >{product.name}</TableCell>
                <TableCell>{formatCurrency(Number(product.price))}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{formatCurrency(product.price * product.quantity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell >{formatCurrency(productsTotal)}</TableCell>
            </TableRow>
          </TableFooter>
    </Table>
    </SheetContent>
      );
};

export default UpsertSheetContent;
