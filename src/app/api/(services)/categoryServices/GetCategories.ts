/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const GetCategoriesService = async () => {
  const categories = await prisma.category.findMany()

  if(!categories){
    return new NextResponse(JSON.stringify({message: 'No se encontraron marcas'}), {status: 404})
  }

  return new NextResponse(JSON.stringify(categories), {status: 200})
}