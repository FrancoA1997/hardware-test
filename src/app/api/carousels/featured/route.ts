// /* ------------------------------Imports---------------------------- */
//Services
import { GetFeaturedProductsService } from "../../(services)/productsServices/GetFeaturedProducts"

// /*---------------------------------------------------------------------- */

export const GET = async() => {
  return GetFeaturedProductsService()  
}