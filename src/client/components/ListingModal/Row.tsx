import { TableCell, TableRow } from "@mui/material";

import Price from "../Price";

export type RowType = { id: number; price: number; label: string | undefined };

const Row = ({ row }: { row: RowType }) => {
  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.label}</TableCell>
      <TableCell align="right">
        <Price price={row.price} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
