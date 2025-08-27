/* ------------------------------Imports---------------------------- */

//Styles
import "../../scss/components/ui/DragAndDrop.scss";

//Components
import { useDropzone } from "react-dropzone";

//Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//React
import { useCallback } from "react";

/*---------------------------------------------------------------------- */
interface DropzoneProps {
  setValue: (name: string, value: (File | null)[] | File) => void;
  name: string;
  index?: number;
  images?: (File | null)[];
  singleImage: boolean;
}

export function MyDropzone({
  setValue,
  name,
  index,
  images,
  singleImage,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!singleImage && index !== undefined && images !== undefined) {
        const newImages = [...images] as (File | null)[];
        newImages[index] = acceptedFiles[0];

        setValue(name, newImages);
      } else {
        setValue(name, acceptedFiles[0]);
      }
    },
    [images, index, name, setValue, singleImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="dropzone__onDrop">
          <CloudUploadIcon id="icon" />
        </div>
      ) : (
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          archivos.
        </p>
      )}
    </div>
  );
}
