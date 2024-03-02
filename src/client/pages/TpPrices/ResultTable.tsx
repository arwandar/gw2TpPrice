import { Item, Transaction } from "../../utils/type";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";

import { Context } from "../../Context";
import Row from "./Row";
import { getSortIcon } from "../../utils/utils";

enum SortKey {
  id = "id",
  name = "name",
  count = "count",
  price = "price",
}

const ResultTable = () => {
  const { effiencyShoppingList, currentOrders } = useContext(Context);
  const [sort, setSort] = useState<{ key: SortKey; order: "asc" | "desc" }>({
    key: SortKey.name,
    order: "asc",
  });

  const rows = useMemo(() => {
    const currentOrdersSet = currentOrders.reduce(
      (list: { [x: string]: number }, item: Transaction) => {
        if (!list[item.item_id]) list[item.item_id] = 0;
        list[item.item_id] += item.quantity;
        return list;
      },
      {}
    );

    return effiencyShoppingList
      .map((item: Item) => {
        if (currentOrdersSet[item.id]) {
          item.count -= currentOrdersSet[item.id];
        }
        return item;
      })
      .filter((item) => item.count >= 0);
  }, [effiencyShoppingList, currentOrders]);

  const handleSort = (key: SortKey) => {
    if (key === sort.key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };

  const visibleRows = useMemo(() => {
    return rows
      .sort((a, b) => {
        if (sort.key === SortKey.name)
          return sort.order === "asc"
            ? a[sort.key].localeCompare(b[sort.key])
            : b[sort.key].localeCompare(a[sort.key]);

        return sort.order === "asc"
          ? a[sort.key] - b[sort.key]
          : b[sort.key] - a[sort.key];
      })
      .slice(0, 10);
  }, [rows, sort]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort(SortKey.id)}>
              Id {getSortIcon(SortKey.id, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.name)}>
              Label {getSortIcon(SortKey.name, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.count)} align="right">
              Qt {getSortIcon(SortKey.count, sort)}
            </TableCell>
            <TableCell onClick={() => handleSort(SortKey.price)} align="right">
              Effrice {getSortIcon(SortKey.price, sort)}
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
