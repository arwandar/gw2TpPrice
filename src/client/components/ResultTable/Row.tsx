import { TableRow, TableCell } from "@mui/material";
import { priceToString } from "../../utils/utils";
import { Item } from "../../utils/type";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";

const Row = ({ row }: { row: Item }) => {
  const { prices, getPrice } = useContext(Context);

  useEffect(() => {
    getPrice(row.id);
  }, []);

  const price = prices[row.id];

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">{row.count}</TableCell>
      <TableCell align="right">{priceToString(row.price)}</TableCell>
      <TableCell align="right">{priceToString(price)}</TableCell>
      <TableCell align="right">
        {price ? priceToString((row.price - price) * row.count) : ""}
      </TableCell>
    </TableRow>
  );
};

export default Row;
function getPrice(item_id: any) {
  throw new Error("Function not implemented.");
}
