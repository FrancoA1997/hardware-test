"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "@/scss/components/dashboard/addBanner/addBanner.scss";

//Components
import { MyDropzone } from "@/components/ui/DragAndDrop";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

//React
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannersSchema } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

/*---------------------------------------------------------------------- */

const Banners = () => {
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [backendError, setBackendError]= useState('')
  const { setValue, handleSubmit, watch } = useForm({
      resolver: zodResolver(bannersSchema), defaultValues: {
        bannerDesktop: null,
        bannerTablet: null
      }});
  const bannerDesktop = watch("bannerDesktop") || null;
  const bannerTablet = watch("bannerTablet") || null;
  // const bannerMobile = watch("bannerMobile") || null;

  const onSubmit = async (data: FieldValues) => {
   
    setErrors({})
    const bannerData = new FormData();
    bannerData.append("bannerDesktop", data.bannerDesktop);
    bannerData.append("bannerTablet", data.bannerTablet);
    const response = await fetch("/api/banners", {
      method: "POST",
      body: bannerData,
    });
    const results = await response.json();
   
    if(results.status === 200){
      toast.success('Banner creado con exito')
      setTimeout(() => {
        router.push('/dashboard/banners-list')
      }, 1500);
    }else if(results.status === 400){
      setBackendError(results.error)
    }
    
   
  };

  const onErrors = (errors) => {
   
    setErrors(errors)
  };
  return (
    <div className="addBanner">
      <h2>Carga de banners</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
        <div className="image-input desktop">
          <span>Banner escritorio</span>
          <p className="info">La resolucion de la imagen debe ser de 1920x500</p>

          {bannerDesktop === null ? (
            <MyDropzone name="bannerDesktop" setValue={setValue} singleImage={true} />
          ) : (
            <><Image style={{overflow: 'hidden'}} width={0} height={0} src={URL.createObjectURL(bannerDesktop)} alt="bannerDesktop" /><div
                onClick={() => setValue("bannerDesktop", null)}
                className="delete"
              >
                <DeleteIcon />
              </div></>
          )}
        </div>
        {errors['bannerDesktop'] &&(
          <p>{errors['bannerDesktop']?.message}</p>
        )}
        <div className="image-input tablet">
          <span>Banner tablet y mobile</span>
          <p className="info">La resolucion de la imagen debe ser de 1200x550</p>
          {bannerTablet === null ? (
            <MyDropzone name="bannerTablet" setValue={setValue} singleImage={true} />
          ) : (
            <><Image style={{overflow: 'hidden'}} width={0} height={0} src={URL.createObjectURL(bannerTablet)} alt="bannerTablet" /><div
                onClick={() => setValue("bannerTablet", null)}
                className="delete"
              >
                <DeleteIcon />
              </div></>
          )}
        </div>
        {errors &&(
        <p>{errors['bannerTablet']?.message}</p>
      )}
      {backendError.length > 0 &&(
        <p>{backendError}</p>
      )}

        {/* <div className="image-input mobile">
          <span>Banner mobile</span>
          {bannerMobile === null ? (
            <MyDropzone name="bannerMobile" setValue={setValue} singleImage={true} />
          ) : (
            <Image width={0} height={0} src={URL.createObjectURL(bannerMobile)} alt="bannerMobile" />
          )}
        </div> */}
        <button type="submit">Subir banners</button>
      </form>
    </div>
  );
};

export default Banners;
