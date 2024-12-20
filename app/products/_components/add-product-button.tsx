"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../_components/ui/button";
import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-product-dialog";


export const AddProductButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      <Button className="gap-2">
        <PlusIcon />
        <span>Novo Produto</span>
      </Button>
    </DialogTrigger>
    <UpsertProductDialogContent setDialogIsOpen={() => setDialogOpen(false)} />
  
  </Dialog> 
  )
};


