/* ------------------------------Imports---------------------------- */

//NextJs
import { NextResponse } from "next/server";
import { getAuthSession } from "lib/auth";
//Utils
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs"; // Para leer archivos en la carpeta
/*---------------------------------------------------------------------- */

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }
  const formData = await req.formData();
  const devices = ["bannerDesktop", "bannerTablet"];
  const uploadedFiles: { [key: string]: string } = {};
  const currentDate = new Date();
  const dateTime = currentDate.getTime();

  // Ruta de la carpeta donde guardas las imágenes
  const folderPath = path.join(process.cwd(), "/public/assets/banners");

  // Obtener todos los archivos en la carpeta
  const existingFiles = fs.readdirSync(folderPath);
  // Limitar la cantidad de archivos a 6
  if (existingFiles.length >= 6) {
    return NextResponse.json(
      {
        error:
          "Solo se pueden cargar como madximo 3 banners, elimina 1 y vuelve a intentar.",
        status: 400,
      },
      { status: 400 }
    );
  }

  try {
    for (const device of devices) {
      const file = formData.get(device) as File;

      if (!file) {
        return NextResponse.json(
          { error: `No se recibio una imagen para ${device}.` },
          { status: 400 }
        );
      }

      const fileExtension = file.name.split(".").pop();
      const imageBuffer = Buffer.from(await file.arrayBuffer());
      const filename = `${dateTime}_${device}.${fileExtension}`;
      const filePath = path.join(
        process.cwd(),
        `/public/assets/banners/${filename}`
      );

      await writeFile(filePath, imageBuffer);
      uploadedFiles[device] = `/assets/banners/${filename}`;
    }

    return NextResponse.json({
      message: "Success",
      files: uploadedFiles,
      status: 200,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error, status: 400 });
  }
};

export const GET = async () => {
  // Ruta de la carpeta donde guardas las imágenes
  const folderPath = path.join(process.cwd(), "/public/assets/banners");

  try {
    const files = fs.readdirSync(folderPath);
    const bannerImages = files.filter((file) =>
      file.match(/\.(jpg|jpeg|png|webp)$/)
    ); // Filter for image files
    console.log(files);
    return NextResponse.json({
      message: "Success",
      images: bannerImages,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to read banner images",
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }
  const bannerId = await req.json();
  if (!bannerId) {
    return NextResponse.json(
      { error: "Banner id is required." },
      { status: 400 }
    );
  }
  const folderPath = path.join(process.cwd(), "/public/assets/banners");
  try {
    const files = fs.readdirSync(folderPath);
    const filesToDelete = files.filter((file) =>
      file.startsWith(`${bannerId}_`)
    );

    if (filesToDelete.length === 0) {
      return NextResponse.json({
        message: "No files found for this banner",
        status: 404,
      });
    }

    for (const file of filesToDelete) {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    }

    return NextResponse.json({
      message: "Banners eliminados con exito",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to DELETE this banner",
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  const body = await req.formData();
  const desktopId = body.get("desktopId") as string
  const bannerDesktop = body.get("desktopBanner") as File
  const tabletId = body.get("tabletId") as string
  const bannerTablet = body.get("bannerTablet") as File
  const folderPath = path.join(process.cwd(), "/public/assets/banners");
  const files = fs.readdirSync(folderPath);
  const filesToDelete = [];
  const dateTime = new Date().getTime()
  
  try {
    if (desktopId !== null && bannerDesktop !== null) {
      files.forEach((file) => {
        if (file === `${desktopId}`) {
          filesToDelete.push(file); // Añade al array si coincide
        }
      });
    }
    if (tabletId !== null && bannerTablet !== null) {
      files.forEach((file) => {
        if (file === `${tabletId}`) {
          filesToDelete.push(file); // Añade al array si coincide
        }
      });
    }

    for (const file of filesToDelete) {
      console.log('fileToDelete', file)
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    }

    if (bannerDesktop !== null && desktopId !== null) {
   
      const imageBuffer = Buffer.from(await bannerDesktop.arrayBuffer());
      const fileExtension = bannerDesktop.name.split(".").pop();
      const filePath = path.join(
        process.cwd(),
        `/public/assets/banners/${dateTime}_bannerDesktop.${fileExtension}`
      );
      await writeFile(filePath, imageBuffer);
    }

    if (bannerTablet !== null && tabletId !== null) {
  
      const imageBuffer = Buffer.from(await bannerTablet.arrayBuffer());
      const fileExtension = bannerTablet.name.split(".").pop();
      const filePath = path.join(
        process.cwd(),
        `/public/assets/banners/${dateTime}_bannerTablet.${fileExtension}`
      );
      await writeFile(filePath, imageBuffer);
    }

    return NextResponse.json({
      message: "Banner actualizado con exito",
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Ocurrio un error al actualizar el banner",
      error: error,
      status: 400,
    });
  }
};
