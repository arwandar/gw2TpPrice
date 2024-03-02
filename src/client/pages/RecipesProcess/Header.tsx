import { Dispatch, SetStateAction } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

import { getSortIcon } from "../../utils/utils";

export enum SortKey {
  name = "name",
  mainUnlocked = "mainUnlocked",
  secondaryUnlocked = "secondaryUnlocked",
}
const Header = ({
  onSort,
  sort,
}: {
  onSort: Dispatch<SetStateAction<{ key: SortKey; order: "asc" | "desc" }>>;
  sort: { key: string; order: "asc" | "desc" };
}) => {
  const handleSort = (key: SortKey) => {
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
          onClick={() => handleSort(SortKey.name)}
          style={{ cursor: "pointer" }}
        >
          Name {getSortIcon(SortKey.name, sort)}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => handleSort(SortKey.mainUnlocked)}
        >
          Main {getSortIcon(SortKey.mainUnlocked, sort)}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => handleSort(SortKey.secondaryUnlocked)}
        >
          Secondary {getSortIcon(SortKey.secondaryUnlocked, sort)}
        </TableCell>
        <TableCell align="right">TP Price</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
