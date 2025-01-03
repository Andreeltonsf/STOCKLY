import { CircleDollarSignIcon, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/Header";
import { getDashboard } from "../_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/current";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./_components/summary-card";




 const Home = async() => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } = await getDashboard();
  return (
   
    <div className="m-8 w-full space-y-8 rounded-lg " >
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
        
    </div>
  );
}


export default Home;
