'use server'
/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */


export const DeleteProductService = async(productId: string) => {
 
   if(productId){

    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { gallery: { include: { images: true, video: true } } },
          });
    
          if (product?.gallery) {
            // Eliminar imágenes asociadas
            await prisma.image.deleteMany({
              where: { galleryId: product.gallery.id },
            });
    
            // Eliminar video asociado
            if (product.gallery.video) {
              await prisma.video.delete({
                where: { galleryId: product.gallery.id },
              });
            }
    
            // Eliminar la galería
            await prisma.gallery.delete({
              where: { id: product.gallery.id },
            });
          }
    
          // Eliminar el producto
          await prisma.product.deleteMany({
            where: { id: productId },
          });

          return new NextResponse(
            JSON.stringify({ message: 'Producto eliminado con exito', status: 200 }),
            { status: 200 }
          );
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: 'Error al eliminar un producto', status: 400, error }),
            { status: 400 }
          ); 
    }
   }
}