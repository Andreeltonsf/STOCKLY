"use client";

import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "../../_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../_components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";

 const formSchema = z.object({
      name: z.string().trim().min(1,{
        message: "O nome do produto é obrigatório",
      }),
      price: z.number().min(0.01,{
        message: "O preço do produto é obrigatório",
      }),
      stock: z.coerce.number().positive({
        message: "O estoque do produto é obrigatório",
      }).min(0,{
        message: "O estoque do produto é obrigatório",
      }),

    });


    type FormData = z.infer<typeof formSchema>;


export const AddProductButton = () => {
   const form = useForm<FormData>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
    }
   );

   const onSubmit = (data: FormData) => {
     console.log(data);
   };

  return (
    <Dialog>
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
            
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
        
    </DialogContent>
  </Dialog> 
  )
};


