import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Item } from "../../utils/type";
import { priceToString } from "../../utils/utils";

const ResultTable = ({ shoppingList }: { shoppingList: Item[] }) => {
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
          {shoppingList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{priceToString(row.effPrice)}</TableCell>
              <TableCell align="right">{priceToString(row.price)}</TableCell>
              <TableCell align="right">
                {priceToString(((row.price || 0) - row.effPrice) * row.count)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
