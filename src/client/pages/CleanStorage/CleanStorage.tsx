import { useEffect, useMemo, useState } from "react";
import { getMaterialStorage } from "../../utils/gw2Api";
import { getLabel, getSortIcon } from "../../utils/utils";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Row from "./Row";
import { Item } from "./type";

enum SortKey {
  id = "id",
  category = "category",
  label = "label",
  count = "count",
  price = "price",
}

const CleanStorage = () => {
  const [toSell, setToSell] = useState<Item[]>([]);

  const [sort, setSort] = useState<{ key: SortKey; order: "asc" | "desc" }>({
    key: SortKey.label,
    order: "asc",
  });

  const getStorage = async () => {
    const res = await getMaterialStorage();
    const maxStorage = parseInt(
      localStorage.getItem("mainStorageMax") || "0",
      10
    );

    const categories = [
      { label: "Matériaux de cuisine", limit: maxStorage - 250, category: 5 },
      {
        label: "Matériaux d'artisanat basiques",
        limit: maxStorage - 100,
        category: 6,
      },
      {
        label: "Matériaux d'artisanat intermédiaires",
        limit: maxStorage - 250,
        category: 29,
      },
      {
        label: "Pierres précieuses et joyaux",
        limit: maxStorage - 250,
        category: 30,
      },
      {
        label: "Matériaux d'artisanat avancé",
        limit: maxStorage - 250,
        category: 37,
      },
      { label: "Matériaux de festival", limit: maxStorage - 250, category: 38 },
    ];

    const getLimit = (category: number) => {
      const cat = categories.find((c) => c.category === category);
      return cat?.limit || 1000;
    };

    const toSellLocal = res
      .filter((item) => item.count > getLimit(item.category))
      .map((item) => {
        return {
          ...item,
          label: getLabel(item.id),
        };
      });

    setToSell(toSellLocal);
  };

  useEffect(() => {
    getStorage();
  }, []);

  const handleSort = (key: SortKey) => {
    if (key === sort.key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort(SortKey.id)}>
              Id {getSortIcon(SortKey.id, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.category)}>
              Catégorie {getSortIcon(SortKey.id, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.label)}>
              Label {getSortIcon(SortKey.label, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.count)} align="right">
              Qt {getSortIcon(SortKey.count, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.price)} align="right">
              Effrice {getSortIcon(SortKey.price, sort)}
            </TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toSell.map((row) => (
            <Row row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CleanStorage;
