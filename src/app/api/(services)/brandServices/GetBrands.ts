/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const GetBrandsService = async () => {
    const brands = await prisma.brand.findMany();

    if (!brands) {
      return new NextResponse(
        JSON.stringify({ message: "No se encontraron marcas" }),
        { status: 404 }
      );
    }
  
    return new NextResponse(JSON.stringify(brands), { status: 200 });
}