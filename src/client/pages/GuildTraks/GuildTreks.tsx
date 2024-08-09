import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useMemo, useRef, useState } from "react";

import DialogResult from "./ResultDialog";
import Row from "./Row";
import { Trek } from "../../utils/type";
import { getSortIcon } from "../../utils/utils";
import guildTreks from "../../utils/guildTreks.json";

enum SortKey {
  nameFr = "nameFr",
  chatCode = "chatCode",
  mapFr = "mapFr",
}
const GuildTreks = () => {
  const [sort, setSort] = useState<{ key: SortKey; order: "asc" | "desc" }>({
    key: SortKey.nameFr,
    order: "asc",
  });
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const [selectedTrekIds, setSelectedTrekIds] = useState<number[]>([]);

  const sortedRows: Trek[] = useMemo(() => {
    return guildTreks
      .sort((a, b) => {
        return sort.order === "asc"
          ? a[sort.key].localeCompare(b[sort.key])
          : b[sort.key].localeCompare(a[sort.key]);
      })
      .map((item) => {
        return { ...item, key: item[sort.key] };
      });
  }, [sort]);

  const visibleRows = useMemo(
    () =>
      sortedRows.filter((sortedRow) =>
        sortedRow.searchFr.includes(
          search
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
        )
      ),
    [sortedRows, search]
  );

  const handleSelect = (id: number) => {
    setSelectedTrekIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setSearch("");
    ref.current?.focus();
  };

  const handleSort = (key: SortKey) => {
    if (key === sort.key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const selectedTracks = useMemo(
    () => guildTreks.filter((trek) => selectedTrekIds.includes(trek.id)),
    [selectedTrekIds]
  );

  return (
    <>
      <TextField
        label="Search"
        value={search || ""}
        onChange={handleSearch}
        fullWidth
        variant="standard"
        inputRef={ref}
        autoFocus
      />
      <DialogResult selectedTreks={selectedTracks} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort(SortKey.nameFr)}>
                Name {getSortIcon(SortKey.nameFr, sort)}
              </TableCell>
              <TableCell onClick={() => handleSort(SortKey.mapFr)}>
                Map {getSortIcon(SortKey.mapFr, sort)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <Row
                row={row}
                key={row.id}
                onClick={() => handleSelect(row.id)}
                selected={selectedTrekIds.includes(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GuildTreks;
