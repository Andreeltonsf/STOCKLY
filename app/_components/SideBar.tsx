"use client";

import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from 'lucide-react';
import SideBarButton from './sidebar-button';

const SideBar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGEM*/}
      <div className="px-8 py-6">
        <h1 className=" font-bold text-2xl">STOCKLY</h1>
      </div>
      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <SideBarButton href="/">
          <LayoutGridIcon size={20}/>
            Dashboard
        </SideBarButton>
        <SideBarButton href="/products">
          <PackageIcon size={20}/>
            Products
        </SideBarButton>
        <SideBarButton href="/sales">
          <ShoppingBasketIcon size={20}/>
            Sales
        </SideBarButton>
      </div>
    </div>
  );
};

export default SideBar;
