/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const UpsertGalleryService = async(body) => {

    const productId = body.get("productId") as string;
    const imagesToDelete = body.getAll("imagesToDelete") as string[];
    const newImages = body.getAll("newImages") as File[];
    const videoUrl = body.get('videoUrl') as string
    let newGallery = {};
    console.log(videoUrl)
  
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        gallery: {
          include: {
            images: true,
          },
        },
      },
    });
    const productGalleryImages = [];
  
    if (product?.galleryId === null) {
      newGallery = await prisma.gallery.create({
        data: {
          lastEditDate: new Date(),
        },
      });
      await prisma.product.update({
        data: {
          galleryId: newGallery.id,
        },
        where: {
          id: productId,
        },
      });
    } else {
      newGallery = await prisma.gallery.update({
        data: {
          lastEditDate: new Date(),
        },
        where: {
          id: product?.galleryId as string,
        },
      });
    }
    
    
    if (newImages.length > 0 && newImages !== null) {
      await Promise.all(
        newImages.map(async (image) => {
          const imageBuffer = await image.arrayBuffer();
          productGalleryImages.push({
            galleryId: product?.gallery !== null ? product?.galleryId : newGallery.id,
            data: Buffer.from(imageBuffer),
            size: image.size,
            type: 'Buffer'
          });
        })
      );
    }
  
   
    try {
      if (imagesToDelete.length > 0) {
        await prisma.image.deleteMany({
          where: {
            id: {
              in: imagesToDelete,
            },
          },
        });
      }
  
      if (productGalleryImages.length > 0) {
        await prisma.image.createMany({
          data: productGalleryImages,
        });
      }
      if(videoUrl){
        await prisma.video.upsert({
          create: {
            data: videoUrl,
            galleryId: newGallery.id
          },
          update: {
            data: videoUrl
          },
          where: {
            galleryId: newGallery.id
          }
        })
      }
  
      return new NextResponse(
        JSON.stringify({ message: "Imagenes cargadas exitosamente!" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Ocurrio un error con la carga de imagenes" }),
        {
          status: 400,
        }
      );
    }
}