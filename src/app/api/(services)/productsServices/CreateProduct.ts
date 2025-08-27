
/* ------------------------------Imports---------------------------- */
//ZOD VALIDATION SCHEMAS
import { newProductServerSchema, galleryImagesSchema } from "lib/serverTypes";

//NextJs
import { NextResponse } from "next/server";

//Prisma singleton
import prisma from "lib/connect";
/*---------------------------------------------------------------------- */
export const CreateProductService = async (body: FormData) => {

  ///Extracting product data
  let productJSON = {
    productName: body.get("productName"),
    productPrice: Number(body.get("productPrice")),
    productDescription: body.get("productDescription"),
    discountPercentage: Number(body.get("discountPercentage") as string),
    videoUrl: body.get("videoUrl"),
    featured: body.get("featured")?.toString() === "true",
    brand: body.get("brand"),
    category: body.get("category"),
    thumbnail: body.get("thumbnail") as File | Buffer,
  };

  ///Gallery images array store for Files converted to buffers
  const galleryImagesData = body.getAll("galleryImages") as Blob[];

  //Validations for main product information and gallery images + videoUrl
  const galleryResults = galleryImagesSchema.safeParse(galleryImagesData);
  const productResults = newProductServerSchema.safeParse(productJSON);

  if (productResults.success && galleryResults.success) {
    ///Get thumbnail and transform it to buffer array
    if (productJSON.thumbnail !== null) {
      const thumbnailBuffer = productJSON.thumbnail instanceof File ? await productJSON.thumbnail.arrayBuffer() : productJSON.thumbnail;
      productJSON = {
        ...productJSON,
        thumbnail: Buffer.from(thumbnailBuffer instanceof ArrayBuffer ? thumbnailBuffer : new ArrayBuffer(0)),
      };
    }

    ///New product creation
    const newProduct = await prisma.product.create({
      data: {
        productName: productJSON.productName as string,
        productDescription: productJSON.productDescription as string,
        productPrice: productJSON.productPrice as number,
        thumbnail: productJSON.thumbnail as Buffer,
        featured: productJSON.featured as boolean,
        discountPercentage: productJSON.discountPercentage as number,
        categoryId: productJSON.category as string,
        brandId: productJSON.brand as string,
      },
    });

    if (galleryImagesData.length > 0 || productJSON.videoUrl !== null) {
      ///Gallery instance
      let newGallery = {
        id: "",
      };
      ///Gallery multimedia creation
      newGallery = await prisma.gallery.create({
        data: {
          lastEditDate: new Date(),
        },
      });
      ///Set new gallery id to the new product created
      if (newGallery.id) {
        await prisma.product.update({
          data: {
            galleryId: newGallery.id,
          },
          where: {
            id: newProduct.id,
          },
        });
      }

      ///Gallery images from File to buffer array
  
      const imagesObj: { galleryId: string; data: Buffer; size: number; type: string; }[] = [];
      if (galleryImagesData.length > 0) {
        await Promise.all(
          galleryImagesData.map(async (image) => {
            const imageBuffer = await image.arrayBuffer();
            imagesObj.push({
              galleryId: newGallery.id,
              data: Buffer.from(imageBuffer),
              size: image.size,
              type: "Buffer"
            })
          })
        );
      }
      ///Handle buffer images into a images object to persist into to the DB

      if (imagesObj.length > 0) {
        await prisma.image.createMany({
          data: imagesObj,
        });
      }

      ///Handle videoUrl to persist into to the DB
      if (productJSON.videoUrl !== null && newGallery !== undefined) {
        await prisma.video.create({
          data: {
            galleryId: newGallery.id,
            data: productJSON.videoUrl.toString(),
          },
        });
      }
    }
  

    return new NextResponse(
      JSON.stringify({
        message: "Producto creado con exito",
        status: 200,
      }),
      { status: 200 }
    );
  } else {
    let customError: unknown[] = [];
    if (productResults.error !== undefined) {
      const productErrors = productResults.error.issues.map((item) => {
        return {
          field: item.path[0],
          message: item.message,
        };
      });
      customError = customError.concat(productErrors);
    }
    if (galleryResults.error !== undefined) {
      const galleryErrors = galleryResults.error.issues.map((item) => {
        return {
          field: "galleryImages",
          message: item.message,
        };
      });
      customError = customError.concat(galleryErrors);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Bad request",
        data: customError,
        old: productJSON,
        status: 400,
      }),
      { status: 400 }
    );
  }
}