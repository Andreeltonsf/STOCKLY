import { db } from "@/app/_lib/prisma"


//Apenas para referênciaa

export async function GET() {
  const products = await db.product.findMany({})
  const ramdomNumber = Math.random()
  return Response.json({products, ramdomNumber},{
    status: 200,
  })
}


export async function POST(request: Request) {
  const { name, price, stock} = await request.json()
  const product = await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  })

  return Response.json(product,{
    status: 201,
  })
}
