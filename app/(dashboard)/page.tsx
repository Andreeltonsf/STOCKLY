import { CircleDollarSignIcon, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/Header";
import { getDashboard } from "../_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/current";
import MostSoldProductItem from "./_components/most-sold-product";
import RevenueCard from "./_components/revenue-card";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./_components/summary-card";




 const Home = async() => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts, totalLast14DaysRevenue,mostSoldProducts } = await getDashboard();
  return (
   
    <div className="m-8 w-full space-y-8 rounded-lg flex flex-col" >
          <Header>
            <HeaderLeft>
              <HeaderTitle>Dashboard</HeaderTitle>
              <HeaderSubtitle>Visão Geral</HeaderSubtitle>
            </HeaderLeft>
            
          </Header>

          <div className="grid grid-cols-2 gap-6">
            <SummaryCard>
              <SummaryCardIcon>
                <DollarSign/>
              </SummaryCardIcon>
              <SummaryCardTitle>Receita Total</SummaryCardTitle>
              <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
            </SummaryCard>
            
            <SummaryCard>
              <SummaryCardIcon>
                <DollarSign/>
              </SummaryCardIcon>
              <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
              <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
            </SummaryCard>


          </div>

          <div className="grid grid-cols-3 gap-6">
          <SummaryCard>
              <SummaryCardIcon>
                <CircleDollarSignIcon/>
              </SummaryCardIcon>
              <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
              <SummaryCardValue>{totalSales}</SummaryCardValue>
            </SummaryCard>

            <SummaryCard>
              <SummaryCardIcon>
                <PackageIcon/>
              </SummaryCardIcon>
              <SummaryCardTitle>Total em estoque</SummaryCardTitle>
              <SummaryCardValue>{totalStock}</SummaryCardValue>
            </SummaryCard>

            <SummaryCard>
              <SummaryCardIcon>
                <ShoppingBasketIcon/>
              </SummaryCardIcon>
              <SummaryCardTitle>Produtos</SummaryCardTitle>
              <SummaryCardValue>{totalProducts}</SummaryCardValue>
            </SummaryCard>
          </div>

         <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
          <div className="flex h-[400px] w-full flex-col overflow-hidden rounded-xl bg-white p-6">
              <p className="text-lg font-semibold text-slate-900">Receita</p>
              <p className="text-sm text-slate-400">Últimos 14 dias</p>
              <RevenueCard data={totalLast14DaysRevenue}/>
            </div>
            <div className="flex h-[400px] w-full flex-col overflow-hidden rounded-xl bg-white p-6">
              <p className="text-lg font-semibold text-slate-900 px-6 pt-6">Produtos Mais Vendidos</p>

              <div className="overflow-y-auto space-y-7mb-6 px-6">
                {mostSoldProducts.map((product) => <MostSoldProductItem key={product.productId} product={product}/>)}
              </div>
            </div>
         </div>

          


        
    </div>
  );
};  


export default Home;


