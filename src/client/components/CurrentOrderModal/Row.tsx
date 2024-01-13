import { useContext, useEffect, useMemo, useState } from "react";
import { Transaction } from "../../utils/type";
import { Context } from "../../Context";
import { TableCell, TableRow } from "@mui/material";
import { getLabel, priceToString } from "../../utils/utils";
import { formatDistanceToNow } from "date-fns";
import { getCurrentPercentile } from "../../utils/gw2TpApi";

const Row = ({ row }: { row: Transaction }) => {
  const { prices, getPrice } = useContext(Context);
  const [percentile, setPercentile] = useState<number | undefined>();

  useEffect(() => {
    getPrice(row.item_id);
    getCurrentPercentile(row.item_id, row.price).then((p: number) =>
      setPercentile(Math.round(p))
    );
  }, []);

  const price = prices[row.item_id];

  const label = useMemo(() => getLabel(row.item_id), [row.item_id]);

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.item_id}
      </TableCell>
      <TableCell>{label}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
      <TableCell align="right">{priceToString(row.price)}</TableCell>
      <TableCell align="right">{priceToString(price)}</TableCell>
      <TableCell align="right">{percentile}</TableCell>
      <TableCell align="right">
        {formatDistanceToNow(new Date(row.created))}
      </TableCell>
    </TableRow>
  );
};

export default Row;