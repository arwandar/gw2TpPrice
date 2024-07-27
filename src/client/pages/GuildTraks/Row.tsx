import { TableCell, TableRow } from "@mui/material";

import { Trek } from "../../utils/type";

const Row = ({
  row,
  onClick,
  selected,
}: {
  row: Trek;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onClick={onClick}
      selected={selected}
    >
      <TableCell component="th" scope="row">
        {row.nameFr}
      </TableCell>
      <TableCell>{row.mapFr}</TableCell>
    </TableRow>
  );
};

export default Row;
