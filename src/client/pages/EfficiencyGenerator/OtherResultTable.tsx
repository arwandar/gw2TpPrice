import { useMemo } from "react";
import { Legendary, OtherLegendary } from "../../utils/type";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CustomDiv,
  CustomImage,
  CustomTableCell,
  getClassName,
} from "./Common";

const ResultTable = ({
  selectedIds,
  handleId,
  legendaries,
}: {
  selectedIds: number[];
  handleId: (id: number) => void;
  legendaries: Legendary[];
}) => {
  const rows = useMemo(() => {
    const localLegendaries: OtherLegendary[] = legendaries.filter(
      (legendary) => legendary.type !== "Armor" && legendary.type !== "Weapon"
    );
    const types = [
      ...new Set(localLegendaries.map((legendary) => legendary.type)),
    ];

    const getProvenance = (type: string, provenance: string) =>
      localLegendaries.filter(
        (legendary) =>
          legendary.type === type &&
          legendary.details?.provenance === provenance
      );

    return types.map((type: string) => {
      return {
        type,
        Pve: getProvenance(type, "PvE"),
        HL: getProvenance(type, "HL"),
        WvW: getProvenance(type, "WvW"),
        PvP: getProvenance(type, "PvP"),
      };
    });
  }, [legendaries]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell width={100}>Type</TableCell>
            <TableCell width={100}>PvE</TableCell>
            <TableCell width={100}>HL</TableCell>
            <TableCell width={100}>WvW</TableCell>
            <TableCell width={100}>PvP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomTableCell>
                <CustomDiv>
                  <span>{row.type}</span>
                </CustomDiv>
              </CustomTableCell>
              {["Pve", "HL", "WvW", "PvP"].map((gen) => (
                <CustomTableCell key={gen}>
                  {(row as Record<string, any>)[gen].length > 0 &&
                    (row as Record<string, any>)[gen].map(
                      (legendary: Legendary) => (
                        <CustomDiv
                          key={legendary.id}
                          onClick={() => handleId(legendary.id)}
                          className={getClassName(legendary, selectedIds)}
                        >
                          <CustomImage
                            src={legendary.icon}
                            alt={legendary.name}
                          />
                          <span>
                            {legendary.name} ({legendary.count || 0}/
                            {legendary.maxCount})
                          </span>
                        </CustomDiv>
                      )
                    )}
                </CustomTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
