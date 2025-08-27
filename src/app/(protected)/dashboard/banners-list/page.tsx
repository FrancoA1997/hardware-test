"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "@/scss/components/dashboard/bannersList/bannersList.scss";
import Image from "next/image";
//Components
//Icons
import GpsOffIcon from "@mui/icons-material/GpsOff";
//Props
//React
//Images
//NextJs
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/*---------------------------------------------------------------------- */
const DashboardBannersList = () => {
  const [banners, setBanners] = useState();
  const [bannersId, setBannersId] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter()
  const getBanners = async () => {
    setIsFetching(true)
    const response = await fetch("/api/banners", {
      method: "GET",
    });
    const results = await response.json();

    if (results.status === 200) {
      const bannersObject = organizeBanners(results.images);
      setBanners(bannersObject);
      setTimeout(() => {
        setIsFetching(false)
      }, 1500);
    }
  };

  const handleEdit = (bannerId: string) => {

    router.push(`/dashboard/edit-banner/${bannerId}`)
  }
  const handleDelete = async (bannerId: string) => {
    const response = await fetch("/api/banners", {
      method: "DELETE",
      body: JSON.stringify(bannerId),
    });
    const results = await response.json();

    if (results.status === 200) {
      toast.success('Banner eliminado con exito')
      getBanners();
      setIsFetching(true);
    }
  };

  const organizeBanners = (images: string[]) => {
    if (!Array.isArray(images)) {
      console.error(
        "Expected images to be an array, but received:",
        typeof images
      );
      return {}; // O devuelve un objeto vacío o maneja el error como prefieras
    }
    const banners: Record<
      string,
      { desktop: string | null; tablet: string | null }
    > = {};
    const ids: string[] = [];

    // Iterar sobre las imágenes y agruparlas por ID
    images.forEach((image) => {
      const [id, size] = image.split("_");
      // Si el banner aún no existe en el objeto, crear su entrada
      if (!banners[id]) {
        banners[id] = { desktop: null, tablet: null };
        if (!ids.includes(id)) {
          ids.push(id); // Agregar el ID al array si no está ya incluido
        }
      }

      // Asignar la imagen a la dimensión correspondiente
      if (size.includes("bannerDesktop")) {
        banners[id].desktop = image;
      } else if (size.includes("bannerTablet")) {
        banners[id].tablet = image;
      }
    });
    setBannersId(ids);

    return banners;
  };
  useEffect(() => {
    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bannersList">
      <h2>Lista de banners</h2>
      {isFetching === true && (
        <div className="bannersList__container">
          <Skeleton variant="rounded" sx={{ width: "100%", height: "300px", margin: '30px 0px' }} />
          <Skeleton variant="rounded" sx={{ width: "100%", height: "300px", margin: '30px 0px' }} />
          
        </div>
      )}
      <div className="bannersList__container">
        {bannersId.length > 0 && isFetching === false && (
          <>
            {bannersId.map((item, idx) => {
              return (
                <div key={item} className="bannersList__item">
                  <span>Banner °{idx + 1}</span>
                  <Image
                    width={1200}
                    height={100}
                    src={`/assets/banners/${banners[item].desktop}`}
                    alt="bannerimg"
                  />
                  <div className="actions">
                  <button id="edit" onClick={() => handleEdit(banners[item].desktop)}>Editar</button>
                  <button id="delete" onClick={() => handleDelete(item)}>
                    Eliminar Banner
                  </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {bannersId.length === 0 && isFetching === false && (
          <h2
            style={{
              width: "100%",
              textAlign: "center",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "40px",
              fontSize: "2em",
            }}
          >
            No se encontraron banners
            <GpsOffIcon style={{ scale: 2, color: "red" }} />
          </h2>
        )}
      </div>
    </div>
  );
};

export default DashboardBannersList;
