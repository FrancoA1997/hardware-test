
/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";

//ZOD VALIDATION SCHEMAS
import {updateProductServerSchema} from "@/lib/serverTypes";

/*---------------------------------------------------------------------- */

export const EditProductService = async (body: FormData) => {
 
    let newThumbnail: Buffer | undefined = undefined;
    const  updatedProductJson = {
      productName: body.get("productName") as string,
      productPrice: Number(body.get("productPrice")) as number,
      productDescription: body.get("productDescription") as string,
      featured: body.get("featured")?.toString() === "true",
      discountPercentage: Number(body.get("discountPercentage") as string),
      brandId: body.get("brand") as string,
      categoryId: body.get("category") as string,
      thumbnail: body.get("thumbnail") as File | Buffer,
    };
    
    const updatedProductId = body.get("productId") as string;
    const updateProductResults = updateProductServerSchema.safeParse(updatedProductJson)

    if (updateProductResults.success) {
      const currentProduct = await prisma.product.findUnique({
        where: {
          id: updatedProductId?.toString(),
        },
      });
  
      if (updatedProductJson.thumbnail !== null) {
        const bufferArray = updatedProductJson.thumbnail instanceof File 
          ? await updatedProductJson.thumbnail.arrayBuffer() 
          : updatedProductJson.thumbnail;
        newThumbnail = Buffer.from(bufferArray instanceof ArrayBuffer ? bufferArray : bufferArray.buffer);
      }
  
      await prisma.product.update({
        where: {
          id: updatedProductId !== null ? updatedProductId.trim() : undefined,
        },
        data: {
          ...updatedProductJson,
          thumbnail:
            updatedProductJson.thumbnail !== null && newThumbnail !== undefined
              ? newThumbnail
              : currentProduct?.thumbnail,
        },
      });
  
      return new NextResponse(
        JSON.stringify({
          message: "Actualizacion exitosa",
          data: updatedProductJson,
          status: 200,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "Not found",
          data: updateProductResults.error,
        }),
        {
          status: 404,
        }
      );
    }  
}