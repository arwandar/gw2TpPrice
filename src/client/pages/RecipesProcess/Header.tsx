import { Dispatch, SetStateAction } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const Header = ({
  onSort,
  sort,
}: {
  onSort: Dispatch<SetStateAction<{ key: string; order: "asc" | "desc" }>>;
  sort: { key: string; order: "asc" | "desc" };
}) => {
  const handleSort = (key: string) => {
    if (key === sort.key) {
      onSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      onSort({ key, order: "asc" });
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          onClick={() => handleSort("name")}
          style={{ cursor: "pointer" }}
        >
          Name {sort.key === "name" && sort.order === "asc" ? "▲" : "▼"}
        </TableCell>
        <TableCell align="right" onClick={() => handleSort("mainUnlocked")}>
          Main
        </TableCell>
        <TableCell
          align="right"
          onClick={() => handleSort("secondaryUnlocked")}
        >
          Secondary
        </TableCell>
        <TableCell align="right">TP Price</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
