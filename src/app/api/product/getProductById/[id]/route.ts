/* ------------------------------Imports---------------------------- */
//Services
import { GetProductByIdService } from "@/app/api/(services)/productsServices/GetProductById";
/*---------------------------------------------------------------------- */
export const GET = async (_:Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  return GetProductByIdService(id);
};
