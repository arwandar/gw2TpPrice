import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";

import { Legendary } from "../../utils/type";
import {
  CustomTableCell,
  CustomDiv,
  CustomImage,
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
    const weaponTypes = [
      ...new Set(
        legendaries
          .filter((legendary) => legendary.type === "Weapon")
          .map((legendary) => legendary.details?.type)
          .filter((type) => type !== undefined)
      ),
    ];

    const getGen = (type: string, extension?: string) =>
      legendaries.filter(
        (legendary) =>
          legendary.type === "Weapon" &&
          legendary?.details.type === type &&
          legendary?.details.extension === extension
      );

    return weaponTypes.map((type: string) => {
      return {
        type,
        gen1: getGen(type, "Origins"),
        gen2: [
          ...getGen(type, "Path of Fire"),
          ...getGen(type, "Heart of Thorns"),
        ],
        gen3: getGen(type, "End of Dragons"),
        gen4: getGen(type, "Janthir Wilds"),
      };
    });
  }, [legendaries]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {["Type", "gen1", "gen2", "gen3", "gen4"].map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
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
              {["gen1", "gen2", "gen3", "gen4"].map((gen) => (
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
