import { Dispatch, SetStateAction } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Legendary } from "../../utils/type";
import Row from "./Row";
import legendaries from "../../utils/legendaries.json";

const ResultTable = ({
  selectedIds,
  handleId,
  legendaries,
  sort,
  onSort,
}: {
  selectedIds: number[];
  handleId: (id: number) => void;
  legendaries: Legendary[];
  sort: { key: "leg" | "precu" | "perf" | "proto"; order: "asc" | "desc" };
  onSort: Dispatch<
    SetStateAction<{
      key: "leg" | "precu" | "perf" | "proto";
      order: "asc" | "desc";
    }>
  >;
}) => {
  const handleSort = (key: "leg" | "precu" | "perf" | "proto") => {
    if (key === sort.key) {
      onSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      onSort({ key, order: "asc" });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={"25%"} onClick={() => handleSort("leg")}>
              Légendaire{" "}
              {sort.key === "leg" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort("precu")}>
              Précurseur{" "}
              {sort.key === "precu" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort("perf")}>
              Perfectionné{" "}
              {sort.key === "perf" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort("proto")}>
              Prototype{" "}
              {sort.key === "proto" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {legendaries.map((row) => (
            <Row
              row={row}
              key={row.idLeg}
              handleId={handleId}
              selectedIds={selectedIds}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
