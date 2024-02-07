import {
  Check,
  LockOpen,
  MailOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";

import Price from "../../components/Price";
import { Recipe } from "../../utils/type";

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
      <TableCell align="right">
        <Price price={price === -1 ? undefined : price} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
