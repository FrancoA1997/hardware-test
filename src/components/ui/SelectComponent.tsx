"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/ui/SelectComponent.scss";

//Icons
import { ArrowDropDown } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckSaveIcon from "@mui/icons-material/CheckBox";
import CheckCancelIcon from "@mui/icons-material/DisabledByDefault";
import { Spinner } from "@geist-ui/core";
//React
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { brands } from "@/data/brands";
// import { categories } from "@/data/categories";

/*---------------------------------------------------------------------- */
interface OptionsProps {
  name: string;
  id: string;
}
interface OptionsObj {
  name: string;
}
interface SelectProps {
  selectValueLabel: string;
  enableCreation: boolean;
  name: string;
  isForm: boolean;
  currentValue?: string | undefined;
  setValue?: (name: string, value: string) => void;
}

export const SelectComponent = ({
  selectValueLabel,
  enableCreation,
  name,
  setValue,
  currentValue,
  isForm,
}: SelectProps) => {
  const [drowpdownToggle, setDrowpdownToggle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    currentValue !== undefined ? currentValue : undefined
  );
  const [optionsObject, setOptionObject] = useState();
  const [newItem, setNewItem] = useState<string>("");
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const searchParams = useSearchParams();
  const filterBrand = searchParams.get("brand") || "";
  const filterCategory = searchParams.get("category") || "";
  const getData = async () => {
    fetch(`/api/${name}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: Array<{ id: string; name: string }>) => {
        setOptions(data);
        const optionsObj: OptionsObj = {};
        data.forEach((item) => {
          optionsObj[item.id] = { name: item.name };
        });
        setOptionObject(optionsObj);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelection = (option: OptionsProps) => {
    setSelected(option.id);
    setDrowpdownToggle(false);
    if (isForm) {
      setValue(name, option.id);
    }
    if (isCreating) {
      setIsCreating(false);
    }
  };

  const handleCreation = async () => {
    if (newItem.length > 1) {
      setError({ message: "", status: false });
      setIsLoading(true);
      const response = fetch(`/api/${name}`, {
        method: "POST",
        body: JSON.stringify({ name: newItem }),
      });

      if ((await response).status === 200) {
        setTimeout(() => {
          getData();
          setNewItem("");
          setIsCreating(false);
          setIsLoading(false);
        }, 1500);
      } else if ((await response).status === 409) {
        setIsLoading(false);
        setNewItem("");
        setError({ message: "Este item ya existe", status: true });
      }
    }
  };

  return (
    <div className={error.status ? "select error" : "select"}>
      <span
        onClick={() => setDrowpdownToggle(!drowpdownToggle)}
        className="toggle"
      />
      {selected !== undefined && optionsObject !== undefined
        ? optionsObject[selected]?.name
        : "Seleccionar"}
      <ArrowDropDown
        id="arrow"
        style={!drowpdownToggle ? { rotate: "-90deg" } : { rotate: "0deg" }}
      />
      <ul className={drowpdownToggle ? "dropdown dropDownToggled" : "dropdown"}>
        {options.map((item, idx) => {
          if (isForm) {
            return (
              <li
                className={selected === item.id ? "selected" : undefined}
                key={idx}
                onClick={() => handleSelection(item)}
              >
                {item.name}
                {selected === item.id && <DoneIcon style={{ scale: ".8" }} />}
              </li>
            );
          } else {
            return (
              <Link
                href={`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
                  [name]: item.id, // Dynamically update the current query param
                }).toString()}`}
                key={idx}
              >
                <li
                  className={selected === item.id ? "selected" : undefined}
                  key={idx}
                  onClick={() => handleSelection(item)}
                >
                  {item.name}
                  {selected === item.id && <DoneIcon style={{ scale: ".8" }} />}
                </li>
              </Link>
            );
          }
        })}

        {options.length < 1 && <li>Sin datos</li>}
        {enableCreation && (
          <li className={isCreating ? "add toggled" : "add"}>
            {isCreating ? (
              <>
                <input
                  type="text"
                  name="newItem"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={
                    error.message.length > 1
                      ? error.message
                      : `Nombre de la ${selectValueLabel}`
                  }
                />
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="actions">
                    <CheckCancelIcon
                      onClick={() => setIsCreating(false)}
                      className="icon"
                      id="cancel"
                    />
                    <CheckSaveIcon
                      onClick={() => handleCreation()}
                      className="icon"
                      id="save"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                Crear {selectValueLabel}
                <AddBoxIcon
                  onClick={() => setIsCreating(true)}
                  style={{ scale: "1.2", cursor: "pointer" }}
                />
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};
