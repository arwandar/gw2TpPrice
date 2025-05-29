import { styled, TableCell } from "@mui/material";
import { Legendary } from "../../utils/type";

export const CustomImage = styled("img")({
  height: "2rem",
  paddingRight: "0.5rem",
});

export const CustomDiv = styled("div")(({ className, theme }) => {
  let backgroundColor = undefined;
  let opacity = undefined;

  const countRegex = className?.match(/current\-count\-(\d+)/);
  const count = countRegex ? parseInt(countRegex[1]) : 0;
  const maxRegex = className?.match(/max\-count\-(\d+)/);
  const max = maxRegex ? parseInt(maxRegex[1]) : 1;

  backgroundColor = `rgba(0, 255, 0, ${(count || 0) / max})`;

  if (className?.includes("selected")) {
    backgroundColor = theme.palette.primary.main;
  }
  return {
    backgroundColor,
    display: "flex",
    alignItems: "center",
  };
});

export const CustomTableCell = styled(TableCell)(({ theme, className }) => {
  return {
    padding: 0,
    verticalAlign: "middle",
  };
});

export const getClassName = (legendary: Legendary, selectedIds: number[]) =>
  `current-count-${legendary.count} max-count-${legendary.maxCount} ${
    selectedIds.includes(legendary.id) ? "selected" : ""
  }`;
