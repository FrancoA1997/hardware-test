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

  // Validar dimensiones utilizando un refinamiento asíncrono
  export const bannersSchema = z.object({
    bannerDesktop: z
    .instanceof(File)
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
    )
    .refine(async (file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      return new Promise<boolean>((resolve) => {
        img.onload = () => {
          const isValid = img.width === 1920 && img.height === 500; // Ejemplo de dimensiones requeridas
          URL.revokeObjectURL(img.src); // Liberar memoria
          resolve(isValid);
        };
  
        img.onerror = () => resolve(false);
      });
    }, {
      message: "La imagen de escritorio debe tener dimensiones de 1920x500.",
    }),
    bannerTablet: z
    .instanceof(File)
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
    )
    .refine(async (file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      return new Promise<boolean>((resolve) => {
        img.onload = () => {
          const isValid = img.width === 1200 && img.height === 550; // Ejemplo de dimensiones requeridas
          URL.revokeObjectURL(img.src); // Liberar memoria
          resolve(isValid);
        };
  
        img.onerror = () => resolve(false);
      });
    }, {
      message: "La imagen de tablet debe tener dimensiones de 1200x550.",
    })
  })
  
  export const bannersEditSchema = z.object({
    bannerDesktop: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Tipo de imagen no aceptado para el thumbnail."
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "El tamaño máximo del archivo es de 5 MB."
    )
    .refine(async (file) => {
      if(file !== null){
        const img = new Image();
        img.src = URL.createObjectURL(file);
    
        return new Promise<boolean>((resolve) => {
          img.onload = () => {
            const isValid = img.width === 1920 && img.height === 500; // Ejemplo de dimensiones requeridas
            URL.revokeObjectURL(img.src); // Liberar memoria
            resolve(isValid);
          };
    
          img.onerror = () => resolve(false);
        });
      }
    }, {
      message: "La imagen de escritorio debe tener dimensiones de 1920x500.",
    })
    .optional().nullable(),
    bannerTablet: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Tipo de imagen no aceptado para el thumbnail."
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "El tamaño máximo del archivo es de 5 MB."
    )
    .refine(async (file) => {
      if(file !== null){
        const img = new Image();
        img.src = URL.createObjectURL(file);
    
        return new Promise<boolean>((resolve) => {
          img.onload = () => {
            const isValid = img.width === 1200 && img.height === 550; // Ejemplo de dimensiones requeridas
            URL.revokeObjectURL(img.src); // Liberar memoria
            resolve(isValid);
          };
    
          img.onerror = () => resolve(false);
        });
      }
    }, {
      message: "La imagen de tablet debe tener dimensiones de 1200x550.",
    })
    .optional().nullable(),
  })

export const newProductClientSchema = z.object({
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
    .min(10, "La descripcion requiere en 10 y 3500 caracteres")
    .max(3500, "La descripcion requiere en 10 y 3500 caracteres"),
 
  featured: z.boolean().optional(),
  discountPercentage: z
    .number()
    .max(100, "El descuento no puede ser mayor a 100")
    .optional(),
  brand: z.string().min(1, { message: "Debes seleccionar una marca" }),
  category: z.string().min(1, { message: "Debes seleccionar una categoria" }),

    
  thumbnail: z
    .any()
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
  galleryImages: z
    .array(
      z
        .any()
        .nullable() // Permitir valores nulos en el array
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
    .optional(),

  videoUrl: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z
      .string()
      .regex(videoUrlRegex, "El url del video no tiene el formato adecuado")
      .optional()
  ),
});


export const updateProductClientSchema = z.object({
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
    .min(10, "La descripcion requiere en 10 y 3500 caracteres")
    .max(3500, "La descripcion requiere en 10 y 3500 caracteres"),

  featured: z.boolean().optional(),
  discountPercentage: z
    .number()
    .max(100, "El descuento no puede ser mayor a 100")
    .optional(),
  brand: z.string().min(1, { message: "Debes seleccionar una marca" }).optional(),
  category: z.string().min(1, { message: "Debes seleccionar una categoria" }).optional(),
  thumbnail: z
    .any()
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Tipo de imagen no aceptado para el thumbnail."
    )
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      "El tamaño máximo del archivo es de 5 MB."
    ).optional().nullable(),
  galleryImages: z
    .array(
      z
        .any()
        .nullable() // Permitir valores nulos en el array
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
    .optional(),

  videoUrl: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z
      .string()
      .regex(videoUrlRegex, "El url del video no tiene el formato adecuado")
      .optional()
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

  


