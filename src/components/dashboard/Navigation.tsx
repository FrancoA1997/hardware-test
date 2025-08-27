"use client";
/* ------------------------------Imports---------------------------- */

//Styles
import "scss/components/dashboard/navigation.scss";

//Icons
import InventoryIcon from "@mui/icons-material/Inventory";

import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ExploreIcon from '@mui/icons-material/Explore';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
//React
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

//Images
import logo from "../../assets/logoOnly.png";

import { signOut } from "next-auth/react";
/*---------------------------------------------------------------------- */

interface SubmenuItem {
  sectionName: string;
  component: string;
  label: ReactNode;
}

interface Submenu {
  products: SubmenuItem[];
  banners: SubmenuItem[];
}

const Navigation = () => {
  const [submenuMounted, setSubmenuMounted] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<string>('Lista de productos');
  const router = useRouter();

  const handleRouting = (key: string, sectionName: string, submenu: string) => {
    router.push(`/dashboard/${key}`);
    setSubmenuMounted(submenu)
    setCurrentSection(sectionName)
  };

  const submenu: Submenu = {
    products: [
      {
        sectionName: 'Cargar producto',
        component: "add-product",
        label: (
          <>
            <AddIcon /> Cargar producto
          </>
        ),
      },
      {
        sectionName: 'Lista de productos',
        component: "products-list",
        label: (
          <>
            <ListIcon /> Listado de productos
          </>
        ),
      },
    ],
    banners: [
      {
        sectionName: 'Cargar banner',
        component: "add-banner",
        label: (
          <>
            <AddIcon /> Cargar banner
          </>
        ),
      },
      {
        sectionName: 'Lista de banners',
        component: "banners-list",
        label: (
          <>
            <ListIcon /> Listado de banners
          </>
        ),
      },
    ],
  };
  return (
    <nav className="navigation">
      <div className="navigation__container">

        <div className="logo">
          <Image src={logo} alt="logo-img" />
          <p>Panel de gestion</p>
        </div>
        <div className="currentSection">
          <p>Estas en</p>
          <span><ExploreIcon id='icon'/> {currentSection}</span>
        </div>
        {/* <Link
          href={`/dashboard/banners`}
          onClick={() => {setSubmenuMounted("banners"); setCurrentSection('Banners menu')}}
          className={
            submenuMounted === "banners"
              ? "navigation__item toggled"
              : "navigation__item"
          }
        >
          <p>
            <CategoryIcon /> Banners
          </p>
        </Link> */}
        <div
          id="dropdown"
          className={
            submenuMounted === "banners"
              ? "navigation__item toggled"
              : "navigation__item"
          }
        >
          <p>
            <ViewCarouselIcon /> Banners
          </p>
          <div className="dropdownMenu">
          <div className="dropdownMenu__container">
              {submenu["banners"].map((item) => (
                <div
                  onClick={() => handleRouting(item.component, item.sectionName, 'banners')}
                  key={item.component}
                  className="dropdownMenu__item"
                >
                  <p>{item.label}</p>
                </div>
              ))}
          </div>
        </div>
        </div>

        <div
          id="dropdown"
          className={
            submenuMounted === "products"
              ? "navigation__item toggled"
              : "navigation__item"
          }
        >
          <p>
            <InventoryIcon /> Productos
          </p>
          <div className="dropdownMenu">
          <div className="dropdownMenu__container">
              {submenu["products"].map((item) => (
                <div
                  onClick={() => handleRouting(item.component, item.sectionName, 'products')}
                  key={item.component}
                  className="dropdownMenu__item"
                >
                  <p>{item.label}</p>
                </div>
              ))}
          </div>
        </div>
        </div>

        <div onClick={() => signOut()} className="navigation__item">
          <p>
  
            <LogoutIcon />
            Logout
          </p>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
