/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const CreateCategoryService = async(body) => {
  const {name} = body;

  const brandExist = await prisma.category.findUnique({
    where:{
        name: name
    }
  })

  if(brandExist){
    return new NextResponse(JSON.stringify({message: "Brand already exist"}), {
        status: 409
    })
  }

  const newCategory = await prisma.category.create({data:{
    name: name
  }})

  return new NextResponse(JSON.stringify(newCategory),{status: 200})
}