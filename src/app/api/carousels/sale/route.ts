/* ------------------------------Imports---------------------------- */
//Services
import { GetSalesProductsService } from "../../(services)/productsServices/GetSalesProducts"
/*---------------------------------------------------------------------- */


export const GET = async() => {
    return GetSalesProductsService();
}