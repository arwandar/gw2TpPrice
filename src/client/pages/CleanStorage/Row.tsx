import { TableCell, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { Context } from "../../Context";
import { Item } from "./type";
import Price from "../../components/Price";
import { getPriceById } from "../../utils/gw2TpApi";
import { getLabelById } from "../../utils/gw2Api";

const Row = ({ row }: { row: Item }) => {
  const [price, setPrice] = useState<number>();
  const [label, setLabel] = useState<string | undefined>(row.label);

  useEffect(() => {
    const getPrice = async () => {
      const res = await getPriceById(row.id, true);
      setPrice(res);
    };

    if (!row.binding) getPrice();

    const getLabel = async () => {
      const res = await getLabelById(row.id);
      setLabel(res);
    };

    if (!row.label) getLabel();
  }, []);

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell onClick={() => navigator.clipboard.writeText(label || "")}>
        {label}
      </TableCell>
      <TableCell align="right">{row.count}</TableCell>
      <TableCell align="right">
        <Price price={price} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
