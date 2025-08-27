"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "../../../../scss/components/dashboard/addProduct/addProduct.scss";

//Components
import { SelectComponent } from "@/components/ui/SelectComponent";
import { MyDropzone } from "@/components/ui/DragAndDrop";
import { toast } from "sonner";
//Icons
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

import ErrorIcon from "@mui/icons-material/ReportGmailerrorred";
import PublishIcon from "@mui/icons-material/Publish";
import { Spinner } from "@geist-ui/core";
//React
import React, {  useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { newProductClientSchema } from "@/lib/types";

/*---------------------------------------------------------------------- */

const AddProduct = () => {
  const {
    register,
    handleSubmit,

    // reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(newProductClientSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      brand: "",
      category: "",
      productPrice: 0,
      discountPercentage: 0,
      thumbnail: null,
      videoUrl: "",
      featured: false,
      galleryImages: [null, null, null, null, null],
    },
  });
  const router = useRouter();
  const [validationErrors, setValidationsErrors] = useState();
  const [stock, setStock] = useState<boolean>(false);
  const galleryImages = watch("galleryImages");
  const thumbnail = watch("thumbnail");
  const stockCheckRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: FieldValues) => {
    setValidationsErrors({});

    toast(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "15px",
        }}
      >
        <Spinner id="spinner" /> Cargando producto
      </div>
    );
    const productData = new FormData();
    if (data.videoUrl !== undefined && data.videoUrl.length > 1) {
      productData.append(
        "videoUrl",
        data.videoUrl === undefined ? "" : data.videoUrl
      );
    }

    productData.append("productName", data.productName);

    productData.append("productPrice", data.productPrice.toString());

    productData.append("productDescription", data.productDescription);

    productData.append("featured", data.featured.toString());

    productData.append(
      "discountPercentage",
      data.discountPercentage.toString()
    );

    productData.append("brand", data.brand);

    productData.append("category", data.category);

    productData.append("thumbnail", data.thumbnail);

    const hasImages = data.galleryImages.filter(
      (image: File) => image !== null
    );
    if (hasImages.length > 0) {
      data.galleryImages.forEach((image) => {
        if (image !== null) {
          productData.append("galleryImages", image);
        }
      });
    }

    const response = await fetch("/api/product", {
      method: "POST",
      body: productData,
    });
    const responseData = await response.json();

    if (responseData.status === 400) {
      toast.error("Ocurrio un error, vuelva a intentarlo.");
      responseData.data.map((error) => {
        setValidationsErrors({
          ...validationErrors,
          [error.field]: {
            message: error.message,
          },
        });
      });
    } else if (response.status === 200) {
      setTimeout(() => {
        toast.success("Producto creado con exito");
      }, 1500);
      setTimeout(() => {
        router.push("/dashboard/products-list");
      }, 4000);
    }
  };
  const onErrors = (errors: object) => {
    setValidationsErrors(errors);
  };

  return (
    <article className="addProduct">
      <section className="addProduct__container">
        <form
          onSubmit={handleSubmit(onSubmit, onErrors)}
          data-aos="fade-up"
          action=""
        >
          <div className="info-container">
            <div className="row-container">
              <div className="input-container medium">
                <span>Nombre del producto</span>
                <input
                  type="text"
                  placeholder="Remera basica"
                  {...register("productName")}
                />
                {validationErrors && validationErrors["productName"] && (
                  <div className="errorMsg">
                    <ErrorIcon id="icon" />
                    {validationErrors["productName"].message}
                  </div>
                )}
              </div>
              <div className="input-container medium">
                <span>Precio del producto</span>
                <div className="input-container-relative">
                  <input
                    type="number"
                    placeholder="1000"
                    {...register("productPrice", { valueAsNumber: true })}
                  />
                  <p className="absolute-left">$</p>
                </div>
                {validationErrors && validationErrors["productPrice"] && (
                  <div className="errorMsg">
                    <ErrorIcon id="icon" />
                    {validationErrors["productPrice"].message}
                  </div>
                )}
              </div>
              <div className="input-container">
                <span>Descuento</span>
                <div className="input-container">
                  <input
                    type="number"
                    placeholder="20"
                    defaultValue={0}
                    {...register("discountPercentage", { valueAsNumber: true })}
                  />
                  <p className="absolute-right">%</p>
                </div>
                {validationErrors && validationErrors["discountPercentage"] && (
                  <div className="errorMsg">
                    <ErrorIcon id="icon" />
                    {validationErrors["discountPercentage"].message}
                  </div>
                )}
              </div>
              <div className="input-container" style={{ maxWidth: "230px" }}>
                <span>Producto destacado</span>
                <input
                  type="text"
                  defaultValue={"¿Destacar producto?"}
                  disabled={true}
                  style={{ paddingLeft: "5px" }}
                />
                <input
                  type="checkbox"
                  style={{ top: "45px", right: "10px" }}
                  {...register("featured", { value: false })}
                />
              </div>
            </div>
            <div className="textarea-container">
              <span>Descripcion del producto</span>
              <textarea
                placeholder="Remera basica"
                {...register("productDescription")}
              />
              {validationErrors && validationErrors["productDescription"] && (
                <div className="errorMsg">
                  <ErrorIcon id="icon" />
                  {validationErrors["productDescription"].message}
                </div>
              )}
            </div>

            <div className="row-container">
              <div className="select-container">
                <span>Marca</span>
                <SelectComponent
                  enableCreation={true}
                  selectValueLabel="Marca"
                  name="brand"
                  isForm={true}
                  setValue={setValue}
                />
                {validationErrors && validationErrors["brand"] && (
                  <div className="errorMsg">
                    <ErrorIcon id="icon" />
                    {validationErrors["brand"].message}
                  </div>
                )}
              </div>
              <div className="select-container">
                <span>Categoria</span>
                <SelectComponent
                  enableCreation={true}
                  selectValueLabel="Categoria"
                  name="category"
                  setValue={setValue}
                  isForm={true}
                />
                {validationErrors && validationErrors["category"] && (
                  <div className="errorMsg">
                    <ErrorIcon id="icon" />
                    {validationErrors["category"].message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="media-container">
            <div className="load-thumbnail">
              <span>Cargar portada</span>
              <div className="dropzone-area">
                <MyDropzone
                  setValue={setValue}
                  name="thumbnail"
                  singleImage={true}
                />
                <div className="preview">
                  {thumbnail ? (
                    <>
                      <Image
                        width={0}
                        height={0}
                        src={URL.createObjectURL(thumbnail)}
                        alt="thumbnail-img"
                      />
                      <div
                        onClick={() => setValue("thumbnail", null)}
                        className="delete"
                      >
                        <DeleteIcon />
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon id="icon" /> <p>Sin imagen</p>
                    </>
                  )}
                </div>
              </div>
              {validationErrors && validationErrors["thumbnail"] && (
                <div className="errorMsg">
                  <ErrorIcon id="icon" />
                  {validationErrors["thumbnail"].message}
                </div>
              )}
            </div>
            <div className="load-gallery">
              <span>Cargar galeria</span>
              <div className="gallery-inputs">
                {galleryImages?.map((item: File | null, idx: number) => (
                  <div key={idx} className="gallery-input-container">
                    {item !== null ? (
                      <div className="gallery-preview">
                        <Image
                          width={0}
                          height={0}
                          src={URL.createObjectURL(item)}
                          alt="gallery-image"
                        />
                        <div
                          onClick={() => {
                            const updatedImages = [...galleryImages];
                            updatedImages[idx] = null;
                            setValue("galleryImages", updatedImages);
                          }}
                          className="delete"
                        >
                          <DeleteIcon id="delete-icon" />
                        </div>
                      </div>
                    ) : (
                      <MyDropzone
                        setValue={setValue}
                        name="galleryImages"
                        index={idx}
                        images={galleryImages}
                        singleImage={false}
                      />
                    )}
                  </div>
                ))}
              </div>
              {validationErrors && validationErrors["galleryImages"] && (
                <div className="errorMsg">
                  <ErrorIcon id="icon" />
                  {validationErrors["galleryImages"].message}
                </div>
              )}
            </div>
            <div className="input-container">
              <span>Video (Youtube)</span>
              <div className="input-container">
                <input
                  type="text"
                  defaultValue=""
                  {...register("videoUrl")}
                  placeholder="https://www.youtube.com/embed/BZ9CNc29wf0?si=rOBIjfvUZM0D2dcw"
                />
              </div>
            </div>
          </div>
          <button type="submit">
            Cargar producto <PublishIcon />
          </button>
        </form>
      </section>
    </article>
  );
};

export default AddProduct;
