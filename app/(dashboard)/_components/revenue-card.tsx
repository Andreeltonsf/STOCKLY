"use client"


import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/_components/ui/chart"
import { DayTotalRevenue } from "@/app/_data-acess/dashboard/get-dashboard"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


const chartConfig: ChartConfig = {
  totalRevenue:{
    label:"Receita",
  }
}


interface RevenueCardProps {
  data:DayTotalRevenue[];
}



const RevenueCard = ({data}:RevenueCardProps) => {
  console.log(data)
  return (
    
      <ChartContainer config={chartConfig} className="min-h-0 w-full">
              <BarChart accessibilityLayer data={data} >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" radius={4}/>
              </BarChart>
      </ChartContainer>

   
    
  )
}


export default RevenueCard
