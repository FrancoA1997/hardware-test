"use server";
/* ------------------------------Imports---------------------------- */
//Services
import { CreateCategoryService } from "../(services)/categoryServices/CreateCategory";
import { GetCategoriesService } from "../(services)/categoryServices/GetCategories";
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
  return CreateCategoryService(body);

};

export const GET = async () => {
 return GetCategoriesService();

};
