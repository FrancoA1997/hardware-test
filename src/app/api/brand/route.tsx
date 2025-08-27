"use server";
/* ------------------------------Imports---------------------------- */
//Services
import { CreateBrandService } from "../(services)/brandServices/CreateBrand";
import { GetBrandsService } from "../(services)/brandServices/GetBrands";

//NextJs
import { getAuthSession } from "lib/auth";
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }
  const body = await req.json();
  return CreateBrandService(body);
};

export const GET = async () => {
 return GetBrandsService();
};
