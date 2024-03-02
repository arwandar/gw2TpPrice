import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Legendary } from "../../utils/type";
import Row from "./Row";
import legendaries from "../../utils/legendaries.json";

const ResultTable = ({
  selectedIds,
  handleId,
  legendaries,
}: {
  selectedIds: number[];
  handleId: (id: number) => void;
  legendaries: Legendary[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={"25%"}>Légendaire</TableCell>
            <TableCell width={"25%"}>Précurseur</TableCell>
            <TableCell width={"25%"}>Perfectionné</TableCell>
            <TableCell width={"25%"}>Prototype</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {legendaries.map((row) => (
            <Row
              row={row}
              key={row.idLeg}
              handleId={handleId}
              selectedIds={selectedIds}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
