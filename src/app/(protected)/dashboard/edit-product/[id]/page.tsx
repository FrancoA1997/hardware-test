"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "scss/components/dashboard/addProduct/addProduct.scss";

//Components
import { SelectComponent } from "@/components/ui/SelectComponent";
import { MyDropzone } from "@/components/ui/DragAndDrop";
import { toast } from "sonner";

//Icons
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import SizeIcon from "@mui/icons-material/Straighten";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import PublishIcon from "@mui/icons-material/Publish";
import ErrorIcon from "@mui/icons-material/ReportGmailerrorred";
import { Spinner } from "@geist-ui/core";
import { Skeleton } from "@mui/material";
//React
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductClientSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
/*---------------------------------------------------------------------- */



interface ProductProps {
  brandId: string;
  categoryId: string;
  discountPercentage: number;
  featured: boolean;
  gallery: {
    id: string;
    images: Array<{
      data: {
        data: number[];
        type: string;
      };
      galleryId: string;
      id: string;
    }>;
    lastEditedDate: string;
    video: {
      data: string;
      galleryId: string;
      id: string;
    };
  };
  id: string;
  productDescription: string;
  productName: string;
  productPrice: number;
  thumbnail: {
    data: {
      data: number[];
      type: string;
    };
  };
}
const EditProduct = () => {
  const router = useRouter();

  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    resolver: zodResolver(updateProductClientSchema),
  });
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductProps>();
  const [validationErrors, setValidationsErrors] = useState();
  const [stock, setStock] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const thumbnail = watch("thumbnail", product?.thumbnail);
  const galleryImages = watch(
    "galleryImages",
    product?.gallery === null
      ? new Array(5).fill(null)
      : product?.gallery.images.concat(
          new Array(5 - product?.gallery.images.length).fill(null)
        )
  );
  const videoUrl = watch(
    "videoUrl",
    product?.gallery !== null ? product?.gallery?.video?.data : undefined
  );

 

 

  const stockCheckRef = useRef<HTMLInputElement>(null);
  watch("brand", product?.brandId);
  watch("category", product?.categoryId);

  const getProductById = async () => {
    const response = await fetch(`/api/product/getProductById/${params.id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setProduct(data);
    setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };

  useEffect(() => {
    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const onSubmit = async (data: FieldValues) => {
    ///FORM DATA INTANCES FOR EACH PRODUCT PARTY
    console.log(data)
    toast(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "15px",
        }}
      >
        <Spinner id="spinner" />
        Editando producto
      </div>
    );
    const productData = new FormData();
    const galleryData = new FormData();
    const sizesData = new FormData();
    const imagesToDelete = getValues("imagesToDelete");
    const sizesToDelete = getValues("sizesToDelete");
    ///-------------------------------- PRODUCT [INFO] UPDATE ---------------------------------------\\\

    productData.append("productName", data.productName);

    productData.append("productPrice", data.productPrice.toString());

    productData.append("productDescription", data.productDescription);

    productData.append("featured", data.featured.toString());

    productData.append(
      "discountPercentage",
      data.discountPercentage.toString()
    );

    productData.append(
      "brand",
      getValues("brand") === undefined ? product?.brandId : getValues("brand")
    );

    productData.append(
      "category",
      getValues("category") === undefined
        ? product?.categoryId
        : getValues("category")
    );

    if (data.thumbnail) {
      productData.append("thumbnail", data.thumbnail);
    }
    if (
      Array.from(productData.entries()).length !== 0 &&
      product?.id !== undefined
    ) {
      if (product?.id !== undefined) {
        productData.append("productId", product.id);
      }
      const response = await fetch("/api/product", {
        method: "PUT",
        body: productData,
      });

      const responseData = await response.json();
      if (responseData.status === 400) {
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
          toast.success("Producto editado con exito");
        }, 1500);
        setTimeout(() => {
          router.push("/dashboard/products-list");
        }, 4000);
      }
    }
    ///-----------------------------------------------------------------------------------------------\\\


    ///--------------------------------- PRODUCT [GALLERY] UPDATE CALL --------------------------------\\\
    if (
      data.videoUrl &&
      data.videoUrl !== undefined &&
      data.videoUrl.length > 1 &&
      data.videoUrl &&
      data.videoUrl !== product?.gallery?.video?.data
    ) {
      galleryData.append(
        "videoUrl",
        data.videoUrl === undefined ? "" : data.videoUrl
      );
    }
    if (
      data.galleryImages &&
      data.galleryImages !== null &&
      galleryImages.length > 0
    ) {
      data.galleryImages.forEach((image: Blob) => {
        if (image?.id === undefined && image !== null) {
          galleryData.append("newImages", image);
        }
      });
    }

    if (
      imagesToDelete?.length > 0 &&
      imagesToDelete !== null &&
      imagesToDelete !== undefined
    ) {
      imagesToDelete.map((imageId: string) => {
        galleryData.append("imagesToDelete", imageId);
      });
    }
    if (
      Array.from(galleryData.entries()).length !== 0 &&
      product?.id !== undefined
    ) {
      galleryData.append("productId", product.id);
      const response = await fetch("/api/multimedia", {
        method: "PUT",
        body: galleryData,
      });
      const responseData = await response.json();
      if (responseData.status === 400) {
        responseData.data.map((error) => {
          setValidationsErrors({
            ...validationErrors,
            [error.field]: {
              message: error.message,
            },
          });
        });
      }
    }
    ///-----------------------------------------------------------------------------------------------\\\
  };
  const onErrors = (errors: object) => {
    console.log(errors);
    setValidationsErrors(errors);
  };

  return (
    <article className="addProduct">
      <section className="addProduct__container">
        {isFetching ? (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              overflowY: "hidden",
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "10dvh" }}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "15dvh" }}
              animation="pulse"
            />
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "20dvh" }}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "35dvh" }}
              animation="pulse"
            />
          </div>
        ) : (
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
                    defaultValue={
                      product !== undefined ? product.productName : undefined
                    }
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
                      defaultValue={
                        product !== undefined ? product.productPrice : undefined
                      }
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
                      defaultValue={
                        product !== undefined
                          ? product.discountPercentage
                          : undefined
                      }
                      {...register("discountPercentage", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute-right">%</p>
                  </div>
                  {validationErrors &&
                    validationErrors["discountPercentage"] && (
                      <div className="errorMsg">
                        <ErrorIcon id="icon" />
                        {validationErrors["discountPercentage"].message}
                      </div>
                    )}
                </div>
                <div className="input-container" style={{maxWidth: '230px'}}>
                <span>Producto destacado</span>
                <input
                    type="text"
                    defaultValue={"¿Destacar producto?"}
                    disabled={true}
                    style={{paddingLeft: '5px'}}
                  />
                  <input
                    type="checkbox"
                    defaultChecked={
                      product !== undefined ? product.featured : false
                    }
                    style={{top: '45px', right: '10px'}}
                    {...register("featured", { value: false })}
                  />
               
                </div>
              </div>
              <div className="textarea-container">
                <span>Descripcion del producto</span>
                <textarea
                  placeholder="Remera basica"
                  defaultValue={
                    product !== undefined
                      ? product.productDescription
                      : undefined
                  }
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
                    setValue={setValue}
                    currentValue={product?.brandId}
                    isForm={true}
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
                    currentValue={product?.categoryId}
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
                          src={
                            thumbnail.type === "Buffer"
                              ? URL.createObjectURL(
                                  new Blob([new Uint8Array(thumbnail.data)])
                                )
                              : URL.createObjectURL(thumbnail)
                          }
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
                            src={
                              item?.data?.type === "Buffer"
                                ? URL.createObjectURL(
                                    new Blob([new Uint8Array(item.data.data)])
                                  )
                                : URL.createObjectURL(item)
                            }
                            alt="gallery-image"
                          />
                          <div
                            onClick={() => {
                              const updatedImages = [...galleryImages];
                              const imagesToDelete =
                                getValues("imagesToDelete") !== undefined
                                  ? getValues("imagesToDelete")
                                  : [];

                              if (updatedImages[idx].id) {
                                imagesToDelete.push(updatedImages[idx].id);
                                setValue("imagesToDelete", imagesToDelete);
                                updatedImages[idx] = null;
                              } else {
                                updatedImages[idx] = null;
                              }
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
                    {...register("videoUrl")}
                    value={videoUrl}
                    placeholder="https://www.youtube.com/embed/BZ9CNc29wf0?si=rOBIjfvUZM0D2dcw"
                  />
                </div>
              </div>
            </div>
            <button type="submit">
              Editar producto <PublishIcon />
            </button>
          </form>
        )}
      </section>
    </article>
  );
};
export default EditProduct;
