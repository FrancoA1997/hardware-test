/* ------------------------------Imports---------------------------- */

//NextJS
import { NextResponse } from "next/server";
import { getAuthSession } from "lib/auth";

//Services
import { UpsertGalleryService } from "../(services)/multimediaServices/UpsertGallery";
import { GetProductsThumbnailsService } from "../(services)/multimediaServices/GetProductsThumbnails";

/*---------------------------------------------------------------------- */

export const PUT = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }
  const body = await req.formData();
  return UpsertGalleryService(body)
};

export const POST = async (req: Request) => {
  const body = await req.json();
  return GetProductsThumbnailsService(body)
};
