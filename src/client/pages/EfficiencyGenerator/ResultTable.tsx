import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";

import { Legendary } from "../../utils/type";
import Row from "./Row";
import { get } from "http";
import { getSortIcon } from "../../utils/utils";
import legendaries from "../../utils/legendaries.json";

enum SortKey {
  leg = "leg",
  precu = "precu",
  perf = "perf",
  proto = "proto",
}

const ResultTable = ({
  selectedIds,
  handleId,
  legendaries,
}: {
  selectedIds: number[];
  handleId: (id: number) => void;
  legendaries: Legendary[];
}) => {
  const [sort, setSort] = useState<{ key: SortKey; order: "asc" | "desc" }>({
    key: SortKey.leg,
    order: "asc",
  });

  const handleSort = (key: SortKey) => {
    if (key === sort.key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };

  const visibleLegendaries = useMemo(
    () =>
      legendaries.sort((a, b) => {
        return sort.order === "asc"
          ? a[sort.key].localeCompare(b[sort.key])
          : b[sort.key].localeCompare(a[sort.key]);
      }),
    [legendaries, sort]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={"25%"} onClick={() => handleSort(SortKey.leg)}>
              Légendaire {getSortIcon(SortKey.leg, sort)}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort(SortKey.precu)}>
              Précurseur {getSortIcon(SortKey.precu, sort)}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort(SortKey.perf)}>
              Perfectionné {getSortIcon(SortKey.perf, sort)}
            </TableCell>
            <TableCell width={"25%"} onClick={() => handleSort(SortKey.proto)}>
              Prototype {getSortIcon(SortKey.proto, sort)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleLegendaries.map((row) => (
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
