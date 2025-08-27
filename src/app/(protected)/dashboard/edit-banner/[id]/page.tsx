"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "@/scss/components/dashboard/editBanner/editBanner.scss";
//Components
import { Skeleton } from "@mui/material";
//Props
import { useParams, useRouter } from "next/navigation";

//Libs
import { bannersEditSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
//NextJs
import Image from "next/image";
import { toast } from "sonner";
/*---------------------------------------------------------------------- */

const EditBanner = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const [backendError, setBackendError] = useState("");
  const [desktop, setDesktop] = useState(null);
  const [tabletMobile, setTabletMobile] = useState(null);
  const params = useParams<{ id: string }>();
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(bannersEditSchema),
    defaultValues: {
      bannerDesktop: null, // Inicializa como null
      bannerTablet: null, // Inicializa como null
    },
  });
  const bannerDesktop = watch("bannerDesktop");
  const bannerTablet = watch("bannerTablet");

  const getBanner = async () => {
    setIsFetching(true);
    const response = await fetch(`/api/banners/${params.id}`, {
      method: "GET",
    });
    const results = await response.json();

    if (results.status === 200) {
      setDesktop(
        results.images.filter((item: string) =>
          item.toLowerCase().includes("desktop")
        )
      );
      setTabletMobile(
        results.images.filter((item: string) =>
          item.toLowerCase().includes("tablet")
        )
      );

      setTimeout(() => {
        setIsFetching(false);
      }, 1500);
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data: FieldValues) => {
    const updateData = new FormData();

    if (data.bannerDesktop instanceof File) {
      updateData.append("desktopId", desktop);
      updateData.append("desktopBanner", data.bannerDesktop);
    }
    if (data.bannerTablet instanceof File) {
      updateData.append("tabletId", tabletMobile);
      updateData.append("bannerTablet", data.bannerTablet);
    }
    if (Array.from(updateData.entries()).length !== 0) {
      const response = await fetch("/api/banners", {
        method: "PUT",
        body: updateData,
      });
      const results = await response.json();
      if (results.status === 200) {
        toast.success("Banner creado con exito");
        setTimeout(() => {
          router.push("/dashboard/banners-list");
        }, 1500);
      } else if (results.status === 400) {
        setBackendError(results.error);
      }
    }
  };

  return (
    <div className="editBanner">
      <h2>Editar banner</h2>
    {backendError && (
      <p>{backendError}</p>
    )}
      {isFetching === true && (
        <div className="editBanner__container">
          <Skeleton
            variant="rounded"
            sx={{ width: "100%", height: "300px", margin: "30px 0px" }}
          />
          <Skeleton
            variant="rounded"
            sx={{ width: "100%", height: "300px", margin: "30px 0px" }}
          />
        </div>
      )}
      {isFetching === false && (
        <form
          className="editBanner__container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="editBanner__item">
            <span>
              <strong>Banner</strong> {"Escritorio "}
            </span>
            <p className="info">
              {"La resolucion de la imagen debe ser de 1920x500 "}
            </p>

            <Image
              width={1200}
              height={500}
              src={
                bannerDesktop instanceof File
                  ? URL.createObjectURL(bannerDesktop)
                  : `/assets/banners/${desktop}`
              }
              alt="bannerimg"
            />
          
             {bannerDesktop instanceof File ? (
              <label
                style={{ color: "red" }}
                onClick={() => setValue("bannerDesktop", null)}
              >
                Cancelar <CancelIcon />
              </label>
            ) : (
              <>
               <label htmlFor="fileDesktop">Cambiar imagen</label>
            <input
              type="file"
              id="fileDesktop"
              {...register("bannerDesktop", {
                onChange: (e) => {
                  const file = e.target.files?.[0]; // Extraer el primer archivo
                  if (file) {
                    setValue("bannerDesktop", file); // Registrar el archivo en React Hook Form
                  }
                },
              })}
              style={{ display: "none" }}
            />
              </>
            )}
          </div>

          <div className="editBanner__item">
            <span>
              <strong>Banner</strong> {"Tablet y mobile"}
            </span>
            <p className="info">
              {"La resolucion de la imagen debe ser de 1200x550"}
            </p>
            <Image
              width={1200}
              height={500}
              src={
                bannerTablet instanceof File
                  ? URL.createObjectURL(bannerTablet)
                  : `/assets/banners/${tabletMobile}`
              }
              alt="bannerimg"
            />
            {bannerTablet instanceof File ? (
              <label
                style={{ color: "red" }}
                onClick={() => setValue("bannerTablet", null)}
              >
                Cancelar <CancelIcon />
              </label>
            ) : (
              <>
                <label htmlFor="fileTablet">Cambiar imagen</label>
                <input
                  type="file"
                  id="fileTablet"
                  {...register("bannerTablet", {
                    onChange: (e) => {
                      const file = e.target.files?.[0]; // Extraer el primer archivo
                      if (file) {
                        setValue("bannerTablet", file); // Registrar el archivo en React Hook Form
                      }
                    },
                  })}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <button>Guardar cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditBanner;
