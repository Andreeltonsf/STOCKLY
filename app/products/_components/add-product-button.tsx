"use client";

import { createProducts } from "@/app/_actions/product/create-product";
import { CreateProductSchema, createProductsSchema } from "@/app/_actions/product/create-product/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Button } from "../../_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../_components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";


export const AddProductButton = () => {

    const[dialogOpen, setDialogOpen] = useState(false)

    const form = useForm<CreateProductSchema>({
     shouldUnregister: true,
     resolver: zodResolver(createProductsSchema),
     defaultValues: {
      name: "",
      price: 0,
      stock: 0,
     },
    }
   );

   const onSubmit = async (data: CreateProductSchema) => {
     try{
       await createProducts(data)
       setDialogOpen(false)
     } catch(error){
       console.error(error)
     }
   };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      <Button className="gap-2">
        <PlusIcon />
        <span>Novo Produto</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
            <DialogDescription>
                Insira as informações do produto
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem>
                <FormLabel>Preço do Produto</FormLabel>
                <FormControl>
                  <NumericFormat {...field} thousandSeparator="." decimalSeparator="," prefix="R$ " decimalScale={2} allowNegative={false} customInput={Input} onValueChange={(values) => field.onChange(values.floatValue)} onChange={() => {}}/>      
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="stock"
            render={({field}) => (
              <FormItem>
                <FormLabel>Estoque do Produto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Digite a quantidade disponível do produto" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">Cancelar</Button>
            </DialogClose>
            
            <Button type="submit" disabled={form.formState.isSubmitting} className="gap-1.5">
              {form.formState.isSubmitting && <Loader2Icon className='animate-spin' size={16}/> }
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
        
    </DialogContent>
  </Dialog> 
  )
};


