import { ChangeEvent, useContext } from "react";

import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";

import { Context } from "../../Context";
import { Item } from "../../utils/type";
import { getBuyableId } from "../../utils/utils";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImportShoppingList = () => {
  const { setEfficiencyShoppingList } = useContext(Context);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || e.target.files?.length !== 1) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        const rows = reader.result.split("\n");
        const header = rows[0].split(",").map((h) => h.trim());

        const arrayOfObjects = rows
          .slice(1)
          .map((row: string) => {
            const values = row.split(",");
            const obj: Record<string, string> = {};
            for (let i = 0; i < header.length; i++) {
              obj[header[i]] = values[i];
            }
            return obj;
          })
          .map((row: Record<string, string>) => {
            const obj: Item = {
              count: parseInt(row["Montant de la liste de courses"]),
              name: row["Nom"],
              id: getBuyableId(row["ID de l'article"]),
              price: parseInt(row["Prix unitaire"]),
            };
            return obj;
          })
          .filter((item) => item.id !== 0 && item.count > 0);

        console.log("arrayOfObjects", arrayOfObjects);

        setEfficiencyShoppingList(arrayOfObjects);
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </>
  );
};

export default ImportShoppingList;
