/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const CreateBrandService = async(body) => {

    const {name} = body;
  
    const brandExist = await prisma.brand.findUnique({
      where:{
          name: name
      }
    })
  
    if(brandExist){
      return new NextResponse(JSON.stringify({message: "Brand already exist"}), {
          status: 409
      })
    }
  
    const newBrand = await prisma.brand.create({data:{
      name: name
    }})
  
    return new NextResponse(JSON.stringify(newBrand),{status: 200})
}