  /* ------------------------------Imports---------------------------- */
  //Next
  import { NextResponse } from "next/server";
  import { getAuthSession } from "lib/auth";

  //Services
  import { CreateProductService } from "../(services)/productsServices/CreateProduct";
  import { EditProductService } from "../(services)/productsServices/EditProduct"
  import { GetProductsService } from "../(services)/productsServices/GetProducts"
  import { DeleteProductService } from "../(services)/productsServices/DeleteProduct"

  /*---------------------------------------------------------------------- */

  //CREATE PRODUCTS ENDPOINT
  export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
        status: 401,
      });
    }
    const body = await req.formData();
    return CreateProductService(body);
  };

  //EDIT PRODUCT INFORMATION ENDPOINT
  export const PUT = async (req: Request) => {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
        status: 401,
      });
    }
    const body = await req.formData();
    return EditProductService(body);
  };
  
  // //GET ALL PRODUCTS ENDPOINT
  export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    return GetProductsService(searchParams);
  };


  export const DELETE = async (req: Request) => {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
        status: 401,
      });
    }
    const productId = await req.json()
    return DeleteProductService(productId)
  }
