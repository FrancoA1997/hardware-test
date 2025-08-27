/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const GetProductsThumbnailsService = async(body: string[]) => {
  
    try {
    const productThumbnails = await prisma.product.findMany({
      where: {
        id:{
          in: body
        }
      },
     select:{
      thumbnail: true,
      id: true,
     }
    });
     
       const formattedThumbnails = productThumbnails.map((thumbnail) => ({
    ...thumbnail,
    thumbnail: Buffer.from(thumbnail.thumbnail),
  }));
      return new NextResponse(
        JSON.stringify({formattedThumbnails}),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Ocurrio un error al obtener las imagenes" }),
        {
          status: 400,
        }
      );
    }
}