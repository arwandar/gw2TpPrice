import { IconButton, TableCell, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";

import { Context } from "../../Context";
import { Item } from "../../utils/type";
import Price from "../../components/Price";
import { Update } from "@mui/icons-material";

const Row = ({ row }: { row: Item }) => {
  const { prices, getPrice } = useContext(Context);

  useEffect(() => {
    getPrice(row.id);
  }, []);

  const price = prices[row.id];
  const stacks = Math.floor(row.count / 250);
  const remainder = row.count % 250;

  const handleClick = () => {
    open(`https://fr.gw2tp.com/item/${row.id}`, "_blank");
  };

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" onClick={handleClick}>
        {row.id}
      </TableCell>
      <TableCell onClick={() => navigator.clipboard.writeText(row.name)}>
        {row.name}
      </TableCell>
      <TableCell
        align="right"
        onClick={() => navigator.clipboard.writeText(row.count.toString())}
      >
        {row.count} {stacks ? `(${stacks} stacks + ${remainder})` : ""}
      </TableCell>
      <TableCell align="right">
        <Price price={row.price} />
      </TableCell>
      <TableCell align="right">
        <Price price={price} />
      </TableCell>
      <TableCell align="right">
        <Price price={price ? (row.price - price) * row.count : undefined} />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => getPrice(row.id)}>
          <Update />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Row;
