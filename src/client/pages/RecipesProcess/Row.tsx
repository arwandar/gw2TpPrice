import {
  Check,
  LockOpen,
  MailOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";

import { Recipe } from "../../utils/type";
import { priceToString } from "../../utils/utils";
import { useMemo } from "react";

const Row = ({ row, price }: { row: Recipe; price?: number }) => {
  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>

      <TableCell align="right">
        {row.mainUnlocked ? <Check /> : <LockOpen />}
      </TableCell>
      <TableCell align="right">
        {row.secondaryUnlocked ? (
          <Check />
        ) : row.canBeSend ? (
          <MailOutline />
        ) : (
          <RemoveCircleOutline />
        )}
      </TableCell>
      <TableCell align="right">{priceToString(price)}</TableCell>
    </TableRow>
  );
};

export default Row;
