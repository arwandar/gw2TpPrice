import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { Context } from "../../Context";
import { Item, Transaction } from "../../utils/type";
import Row from "./Row";

const ResultTable = () => {
  const { effiencyShoppingList, currentOrders } = useContext(Context);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Label</TableCell>
            <TableCell align="right">Qt</TableCell>
            <TableCell align="right">Effrice</TableCell>
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
