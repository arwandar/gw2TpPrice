import { ChangeEvent } from "react";
import { getId } from "../../utils/utils";
import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";

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

const ImportShoppingList = ({
  setShoppingList,
}: {
  setShoppingList: Function;
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || e.target.files?.length !== 1) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        const rows = reader.result.split("\n");
        const arrayOfObjects = rows
          .slice(1)
          .map((row: string) => {
            const values = row.split(",");
            const obj = {
              count: values[1],
              name: values[2],
              id: getId(values[2]),
              effPrice: values[3],
            };
            return obj;
          })
          .filter((item) => item.id);

        setShoppingList(arrayOfObjects);
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
