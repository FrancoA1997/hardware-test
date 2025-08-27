import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "Buffer",
];
const videoUrlRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}\?si=[a-zA-Z0-9_-]+$/;

console.log(ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE)
export function testZod() {
  return "Zod test";
}
export const updateProductServerSchema = z.object({
  productName: z
    .string()
    .min(2, "El nombre del producto requiere entre 2 y 35 caracteres")
    .max(35, "El nombre del producto requiere entre 2 y 35 caracteres"),
  productPrice: z
    .number({
      message: "El producto requiere un precio",
      invalid_type_error: "El producto requiere un precio",
    })
    .min(1, "El precio debe ser como minimo 1"),
  productDescription: z
    .string()
    .min(10, "La descripcion debe tener como minimo 10 caracteres")
    .max(3500, "La descripcion como maximo puede contener 3500 caracteres"),

  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  brandId: z.string(),
  categoryId: z.string(),
  thumbnail: z.any()
  .refine(
    (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Tipo de imagen no aceptado para el thumbnail."
  )
  .refine(
    (file) => file === null || file?.size <= MAX_FILE_SIZE,
    "El tamaño máximo del archivo es de 5 MB."
  ).nullable(),
   
});
  
export const newProductServerSchema = z.object({
  productName: z
    .string()
    .min(2, "El nombre del producto requiere entre 2 y 35 caracteres")
    .max(35, "El nombre del producto requiere entre 2 y 35 caracteres"),
  productPrice: z
    .number({
      message: "El producto requiere un precio",
      invalid_type_error: "El producto requiere un precio",
    })
    .min(1, "El precio debe ser como minimo 1"),
  productDescription: z
    .string()
    .min(10, "La descripcion debe tener como minimo 10 caracteres")
    .max(3500, "La descripcion como maximo puede contener 3500 caracteres"),

  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.any()
  .refine((file) => file !== null && file !== undefined, {
    message: "Se requiere una imagen para el thumbnail.",
  })
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Tipo de imagen no aceptado para el thumbnail."
  )
  .refine(
    (file) => file?.size <= MAX_FILE_SIZE,
    "El tamaño máximo del archivo es de 5 MB."
  ),

  
    videoUrl: z.preprocess(
      (arg) => (arg === "" ? undefined : arg),
      z
      
        .string()
        .regex(videoUrlRegex, "El url del video no tiene el formato adecuado")
        .optional().nullable()
    ),
});


export const galleryImagesSchema = z
  .array(
    z
      .any()
      .nullable()
      .refine(
        (file) => file === null || file?.size <= MAX_FILE_SIZE,
        "El tamaño máximo de cada imagen es de 5 MB."
      )
      .refine(
        (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Solo se aceptan archivos .jpg, .jpeg, .png y .webp."
      )
  )
  .max(5, "Se pueden cargar un máximo de 5 imágenes en la galería.")
  .optional();

  


