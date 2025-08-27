/* ------------------------------Imports---------------------------- */
//Services
import { GetRelatedProductsService } from "../../(services)/productsServices/GetRelatedProducts"
/*---------------------------------------------------------------------- */
export const GET = async(req: Request) => {
    const { searchParams } = new URL(req.url);
 return GetRelatedProductsService(searchParams);   
}