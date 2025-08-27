/* ------------------------------Imports---------------------------- */
//Lib
import prisma from "lib/connect";

//Next
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const GetProductByIdService = async (productId: string) => {
  const productByid = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      gallery: {
        include: {
          images: true,
          video: true,
        },
      },
    },
  });
  let formatedImages = [];
  if (productByid.gallery !== null) {
    formatedImages = productByid.gallery.images.map((image) => ({
      ...image,
      data: Buffer.from(image.data),
    }));
  }

  const formattedProduct = {
    ...productByid,
    gallery: {
      ...productByid.gallery,
      images: formatedImages !== null ? formatedImages : [],
    },

    thumbnail: Buffer.from(productByid.thumbnail),
  };
  console.log("productByid", productByid);
  if (formattedProduct) {
    return new NextResponse(JSON.stringify(formattedProduct), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ message: "No se encontraron productos" }),
      { status: 404 }
    );
  }
};
