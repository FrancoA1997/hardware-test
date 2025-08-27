/* ------------------------------Imports---------------------------- */
//Styles
import "scss/components/products/skeletonProduct.scss";
//Components
import Skeleton from "@mui/material/Skeleton";
import { Spinner } from "@geist-ui/core";
//Icons
//Props
//React
//Images
//NextJs
/*---------------------------------------------------------------------- */


const SkeletonProduct = ({isFetching}) => {
  return (
    <div className={isFetching ? 'skeletonCard' : 'skeletonCard animationOff'}>
      <div className="skeletonCard__image">
        <Skeleton
          animation="wave"
          variant="rounded"
          style={{ height: "100%" }}
        />
        <div className="spinner-container">
          <Spinner id="spinner" />
        </div>
      </div>
      <div className="skeletonCard__info">
        <div className="info-container">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
         
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
