"use server";
/* ------------------------------Imports---------------------------- */
//Prisma singleton
import prisma from "lib/connect";

//NextJs
import { NextResponse } from "next/server";
/*---------------------------------------------------------------------- */
export const GetProductsService = async (searchParams: URLSearchParams) => {
  const brand = searchParams.get("brand")
    ? searchParams.get("brand")
    : undefined;
  const category = searchParams.get("category")
    ? searchParams.get("category")
    : undefined;
  const minPrice = searchParams.get("min")
    ? Number(searchParams.get("min"))
    : undefined;
  const maxPrice = searchParams.get("max")
    ? Number(searchParams.get("max"))
    : undefined;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const orderBy = searchParams.get("orderBy") || "desc";
  const name = searchParams.get("name") || undefined;
  const PRODUCT_LIMIT = 15;
  const offset = (page - 1) * PRODUCT_LIMIT;

  const filters = [];
  if (brand) {
    filters.push({ brandId: brand });
  }
  if (name) {
    filters.push({
      productName: {
        contains: name,
        mode: "insensitive",
      },
    });
  }
  if (category) {
    filters.push({ categoryId: category });
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.push({
      productPrice: {
        ...(minPrice !== undefined && { gte: minPrice }), // gte: greater than or equal to
        ...(maxPrice !== undefined && { lte: maxPrice }), // lte: less than or equal to
      },
    });
  }

  // Consulta a Prisma con los filtros dinámicos
  const [allProducts, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        AND: filters,
      },
      select: {
        id: true,
        productName: true,
        productPrice: true,
        thumbnail: true,
        discountPercentage: true,
        brandId: true,
        categoryId: true,
        featured: true,
      },
      skip: offset,
      take: PRODUCT_LIMIT,
      orderBy: { productPrice: orderBy },
    }),
    prisma.product.count({
      where: {
        AND: filters,
      },
    }),
  ]);

  const formattedProducts = allProducts.map((product) => ({
    ...product,
    thumbnail: Buffer.from(product.thumbnail),
  }));
  if (formattedProducts) {
    return new NextResponse(
      JSON.stringify({ data: formattedProducts, productsCount: totalProducts }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ message: "No se encontraron productos" }),
      { status: 404 }
    );
  }
};
