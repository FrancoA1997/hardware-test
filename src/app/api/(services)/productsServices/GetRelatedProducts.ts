/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */
export const GetRelatedProductsService = async (searchParams: URLSearchParams) => {

    const category = searchParams.get('category') || undefined;
    const PRODUCT_LIMIT = 10;
  console.log(category)
    // Consulta a Prisma con los filtros dinámicos
   
   const relatedProducts = await prisma.product.findMany({
        where: {
          categoryId: category,
        },
        take: PRODUCT_LIMIT,
        select: {
          id: true,
          productName: true,
          productPrice: true,
          thumbnail: true,
          discountPercentage: true,
          brandId: true,
          categoryId: true,
          featured: true,
        }
      })
          const formattedProducts = relatedProducts.map((product) => ({
    ...product,
    thumbnail: Buffer.from(product.thumbnail),
  }));
    if (formattedProducts) {
      return new NextResponse(
        JSON.stringify({ data: formattedProducts, status: 200}),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No se encontraron productos", status: 404 }),
        { status: 404 }
      );
    }
}