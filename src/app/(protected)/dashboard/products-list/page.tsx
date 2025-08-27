"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "scss/components/dashboard/productList/productList.scss";

//Components
import { SelectComponent } from "@/components/ui/SelectComponent";
import { toast } from 'sonner'
//Icons
import SearchIcon from "@mui/icons-material/Search";
import CleanFilters from "@mui/icons-material/FilterAltOff";
import { Spinner } from "@geist-ui/core";
import { useDebounce } from "@/hooks/hooks";

//Images
import Link from "next/link";

//React/Next
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@mui/material";
import ProductListItem from "@/components/dashboard/ProductListItem";
/*---------------------------------------------------------------------- */
interface BrandOrCategory {
  name: string;
}
interface BrandsAndCategories {
  [id: string]: BrandOrCategory;
}
const DashboardProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState()
  const [brandsAndCategories, setBrandAndCategories] =
    useState<BrandsAndCategories>({});
  const [pageCount, setPageCount] = useState(new Array(1));
  const [isFetching, setIsFetching] = useState(true);
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand") || "";
  const selectedCategory = searchParams.get("category") || "";
  const debounceSearch = useDebounce(search);
  const selectedPage = searchParams.get("page") || "1";

  const params = new URLSearchParams();
  if (selectedBrand) params.append("brand", selectedBrand);
  if (selectedCategory) params.append("category", selectedCategory);
  if (selectedPage) params.append("page", selectedPage);
  if (debounceSearch) params.append("name", debounceSearch);

  const getAllCategoriesAndBrands = async () => {
    const [brandResponse, categoryResponse] = await Promise.all([
      fetch("/api/brand", { method: "GET" }),
      fetch("/api/category", { method: "GET" }),
    ]);

    const brandsData: Array<{ id: string; name: string }> =
      await brandResponse.json();
    const categoriesData: Array<{ id: string; name: string }> =
      await categoryResponse.json();
    const newBrandsAndCategories: BrandsAndCategories = {};
    brandsData.map((item) => {
      newBrandsAndCategories[item.id] = { name: item.name };
    });

    categoriesData.map((item) => {
      newBrandsAndCategories[item.id] = { name: item.name };
    });
    console.log(newBrandsAndCategories);
    setBrandAndCategories(newBrandsAndCategories);
  };

  const handleProductDelete  = async() => {
   
    if(productToDelete){
      toast(<div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap:'15px'}}><Spinner id="spinner" /> Eliminando producto...</div>)
      const response = await fetch(`/api/product`,
        {
          method: 'DELETE',
          body: JSON.stringify(productToDelete)
        }
      )
      const results = await response.json() 
      if(results.status === 200){
        setToggleModal(false)
        toast.success('Producto creado con exito')
        getAllProducts()
      }else{
        setToggleModal(false)
        toast.error('Ocurrio un error, vuelva a intentarlo.')
      }
    }
  }

  const getAllProducts = async () => {
    const productResponse = await fetch(`/api/product?${params.toString()}`, {
      method: "GET",
    });
    const productData = await productResponse.json();
    setProducts(productData.data);
    setPageCount(
      new Array(Math.ceil(productData.productsCount / 15)).fill(null)
    );
    setTimeout(() => {
      setIsFetching(false);
    }, 1500);
  };

  useEffect(() => {
    getAllProducts();
    setIsFetching(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand, selectedCategory, selectedPage, debounceSearch]);
  useEffect(() => {
    getAllCategoriesAndBrands();
  }, []);

  const productsCards = useMemo(() => {
    return products.map((item, idx) => (
      <ProductListItem setProductToDelete={setProductToDelete} setToggleModal={setToggleModal} item={item} brandsAndCategories={brandsAndCategories} key={idx}/>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  return (
    <article className="dashboardProductsList">
      <section data-aos="fade-up" className="dashboardProductsList__container">
        <div className="filterOptions">
          <div className="filter">
            <div className="filter__item">
              <h3>Filtrar por nombre</h3>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nombre del producto"
              />
              <SearchIcon id="searchIcon" />
            </div>
            <div className="filter__item">
              <h3>
                Filtrar por <strong style={{ color: "#E91E5D" }}>marca</strong>
              </h3>
              <SelectComponent
                name="brand"
                enableCreation={false}
                isForm={false}
                selectValueLabel="marca"
              />
            </div>
            <div className="filter__item">
              <h3>
                Filtrar por{" "}
                <strong style={{ color: "#4778DC" }}>categoria</strong>
              </h3>
              <SelectComponent
                name="category"
                enableCreation={false}
                selectValueLabel="categorias"
              />
            </div>

            <div className="clean-filters">
              <Link href={"/dashboard/products-list"}>
                <CleanFilters />
              </Link>
            </div>
          </div>
        </div>
        {/* <div className='productsList__headers'>
            <span className='headerItem'></span>
            <span className='headerItem'>Nombre</span>
            <span className='headerItem'>Precio</span>
            <span className='headerItem'>Marca</span>
            <span className='headerItem'>Categoria</span>
            <span className='headerItem'>Acciones</span>
          </div> */}
        {isFetching ? (
          <div className="productsList">
         
            <div
              style={{
                width: "99%",
                height: "98%",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Spinner style={{ scale: "3" }} />
            </div>
          </div>
        ) : (
          <div className="productsList">
               <div className={toggleModal ? "deleteModal deleteModalOpen" : "deleteModal"}>
              <div className="deleteModal__container">
                <span>¿Esta seguro que desea eliminar este producto?</span>
                <p>¡Esto no se puede revertir!</p>
                <div className="actions">
                  <button id="confirm" onClick={() => handleProductDelete()}>Eliminar</button>
                  <button id="cancel" onClick={() => setToggleModal(false)}>Volver</button>
                </div>
              </div>
            </div>
            {productsCards}
            </div>
        )}

        <div className="pagination">
          {isFetching ? (
            <>
              <Skeleton
                variant="rounded"
                sx={{ width: "30px", height: "30px" }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: "30px", height: "30px" }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: "30px", height: "30px" }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: "30px", height: "30px" }}
              />
            </>
          ) : (
            <>
              {pageCount.map((_, idx) => (
                <Link
                  href={`?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
                    ["page"]: (idx + 1).toString(),
                    // Dynamically update the current query param
                  }).toString()}`}
                  key={idx}
                  className="pagination__item"
                >
                  {idx + 1}
                </Link>
              ))}
            </>
          )}
        </div>
      </section>
    </article>
  );
};

export default DashboardProductsList;
