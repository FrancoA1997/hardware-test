/* ------------------------------Imports---------------------------- */
//Styles
import 'scss/components/dashboard/productList/productListItem.scss'
//Components
//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeRounded";
import FeaturedIcon from '@mui/icons-material/Grade';
//Props
//React
//Images
//NextJs
import Image from "next/image";
import Link from "next/link";
/*---------------------------------------------------------------------- */

const ProductListItem = ({item, brandsAndCategories, setToggleModal, setProductToDelete}) => {
  console.log(item)
  return (
    <div className="productListItem">
        <div className="image">
          <Image
            width={0}
            height={0}
            src={URL.createObjectURL(
              new Blob([new Uint8Array(item?.thumbnail.data)])
            )}
            alt="item-image"
          />
        </div>
        {item.featured && (
          <div className="featured"><FeaturedIcon sx={{color: 'inherit'}}/></div>
        )}
        <div className="name">{item.productName}</div>
        <div className="price">$ {item.productPrice}</div>
        <div className="brand">{brandsAndCategories[item.brandId]?.name}</div>
        <div className="category">
          {brandsAndCategories[item.categoryId]?.name}
        </div>
        <div
          className="actions
"
        >
          <Link href={`edit-product/${item.id}`} id="edit">
            <EditIcon id="icon" />
          </Link>
          <button id="delete"  onClick={() => {setToggleModal(true); setProductToDelete(item.id)}}>
            <DeleteIcon id="icon" />
          </button>
        </div>
      </div>
  )
}

export default ProductListItem