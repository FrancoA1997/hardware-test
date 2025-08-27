"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/products/productsSidebar.scss";
//Components
import Link from "next/link";
//Icons
import FilterIcon from "@mui/icons-material/FilterAlt";
import OrderByIcon from "@mui/icons-material/ViewList";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { SelectComponent } from "../ui/SelectComponent";
import { useRouter, useSearchParams } from "next/navigation";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
/*---------------------------------------------------------------------- */
interface listProps {
  toggleOpen: boolean;
  setIsToggle: (value: boolean) => void;
}
interface orderByProps {
  name: string;
  value: string;
}
const ProductsSidebar = ({ toggleOpen, setIsToggle }: listProps) => {
  const [openOrderBy, setOpenOrderBy] = useState(false);
  const [orderSelected, setOrderSelected] = useState("Ordernar por");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") || "";
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const orderOptions = [
    { name: "Menor precio", value: "asc" },
    { name: "Mayor precio", value: "desc" },
  ];

  const handlePriceFilter = () => {
    if (
      minPrice !== null &&
      minPrice > 0 &&
      maxPrice !== null &&
      maxPrice > 0 &&
      maxPrice > minPrice
    ) {
      router.push(
        `?${new URLSearchParams({
          ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
          ["min"]: minPrice.toString(),
          ["max"]: maxPrice.toString(), // Dynamically update the current query param
        }).toString()}`
      );
    }else if (
      minPrice !== null &&
      minPrice > 0 &&
      (maxPrice === null || maxPrice === 0)){
            `?${new URLSearchParams({
          ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
          ["min"]: minPrice.toString(),
          ["max"]: '10000000', // Dynamically update the current query param
        }).toString()}`
      }else if (
      (minPrice === null || minPrice === 0) && (
        maxPrice !== null &&
        maxPrice > 0)
      ){
             `?${new URLSearchParams({
          ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
          ["min"]: '1',
          ["max"]: maxPrice.toString(), // Dynamically update the current query param
        }).toString()}`
      }
      
  };

  const handleOrder = (option: orderByProps) => {
    setOrderSelected(option.name);
    router.push(
      `?${new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
        ["orderBy"]: option.value, // Dynamically update the current query param
      }).toString()}`
    );
  };
  const handleClearFilter = () => {
    router.push(`/productos`);
  };

  return (
    <aside className={toggleOpen ? "productsSidebar open" : "productsSidebar"}>
      <div
        className={
          toggleOpen
            ? "productsSidebar__container open"
            : "productsSidebar__container"
        }
      >
        <button className="toggleOpen" onClick={() => setIsToggle(!toggleOpen)}>
          <p>{!toggleOpen ? "Abrir filtros" : "Cerrar filtros"}</p>
          <FilterAltIcon id="icon" />
        </button>
        <div className="navigation">
          <Link href={"/"}>inicio</Link>
          <LinearScaleIcon />
          <p>productos</p>
        </div>
        <h2>Productos</h2>
        {min || max || brand || category  ? (
          <div className="clear-filter" onClick={() => handleClearFilter()}>
            Limpiar filtros <FilterAltOffIcon />
          </div>
        ) : null}
        <div
          onClick={() => setOpenOrderBy(!openOrderBy)}
          className="filter-order"
        >
          <OrderByIcon />
          <p>{orderSelected}</p>
          <ul className={openOrderBy ? "orderByOpen" : ""}>
            {orderOptions.map((orderOption, idx) => (
              <li key={idx} onClick={() => handleOrder(orderOption)}>
                {orderOption.name}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="filter-prices">
          <h3>Precio</h3>
          <div className="inputs">
            <div className="input-container">
              <span>Desde</span>
              <input
                type="number"
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="1.000"
              />
            </div>
            <div className="input-container">
              <span>Hasta</span>
              <input
                type="number"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="100.000"
              />
            </div>
            <button onClick={() => handlePriceFilter()}>
              Aplicar <FilterIcon style={{ scale: ".6" }} />
            </button>
          </div>
        </div> */}
        <div className="filter-brands">
          <h3>Marcas</h3>
          <SelectComponent
            name="brand"
            isForm={false}
            enableCreation={false}
            selectValueLabel="Marca"
          />
          <h3 style={{ marginTop: "15px" }}>Categoria</h3>
          <SelectComponent
            name="category"
            isForm={false}
            enableCreation={false}
            selectValueLabel="Categoria"
          />
        </div>
      </div>
    </aside>
  );
};

export default ProductsSidebar;
