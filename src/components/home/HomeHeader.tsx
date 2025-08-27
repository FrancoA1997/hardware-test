/* ------------------------------Imports---------------------------- */
//Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../scss/components/home/homeHeader.scss";

//Components
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "@geist-ui/core";

/*---------------------------------------------------------------------- */

const HomeHeader = () => {
  const [banners, setBanners] = useState();
  const [bannersId, setBannersId] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const getBanners = async () => {
    const response = await fetch("/api/banners", {
      method: "GET",
    });
    const results = await response.json();

    if (results.status === 200) {
      setTimeout(() => {
        setIsFetching(false);
      }, 1000);
      const bannersObject = organizeBanners(results.images);
      setBanners(bannersObject);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <header className="home-header">
      {isFetching ? (
        <div className="loader">
          <Spinner className="icon" />
        </div>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {bannersId.map((item, idx) => (
              <div key={idx}>
                <Image
                  
                  width={1920}
                  height={500}
                  src={`/assets/banners/${banners[item].desktop}`}
                  alt="bannerimg"
                  id="bannerDesktop"
                />
                <div className="tabletContainer" id="bannerTablet">
                  <Image
                    key={item}
                    width={1200}
                    height={500}
                    src={`/assets/banners/${banners[item].tablet}`}
                    alt="bannerimg"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
