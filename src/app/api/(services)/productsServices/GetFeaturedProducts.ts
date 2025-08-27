/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */
export const GetFeaturedProductsService = async () => {

    const PRODUCT_LIMIT = 10;

    // Consulta a Prisma con los filtros dinámicos
   
   const allProducts = await prisma.product.findMany({
        where: {
          featured: true,
        },
        take: PRODUCT_LIMIT,
        select: {
          id: true,
          productName: true,
          productPrice: true,
          thumbnail: true,
          discountPercentage: true,
          featured: true,
        }
      })
         const formattedProducts = allProducts.map((product) => ({
    ...product,
    thumbnail: Buffer.from(product.thumbnail),
  }));
    if (formattedProducts) {
      return new NextResponse(
        JSON.stringify({ data: formattedProducts}),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No se encontraron productos" }),
        { status: 404 }
      );
    }
}