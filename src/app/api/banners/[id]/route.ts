/* ------------------------------Imports---------------------------- */
//Styles
//Components
//Icons
//Props
//React
//Images
//NextJs
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
/*---------------------------------------------------------------------- */

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const bannerId = id.slice(0, 13);
  const folderPath = path.join(process.cwd(), "/public/assets/banners");
  try {
    const files = fs.readdirSync(folderPath);
    const filesToSend = files.filter((file) => file.startsWith(`${bannerId}_`));
    console.log(files);
    return NextResponse.json({
      message: "Success",
      images: filesToSend,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to read banner images",
      status: 500,
    });
  }
  return NextResponse.json({
    message: "Failed to read banner images",
    status: 500,
  });
};
