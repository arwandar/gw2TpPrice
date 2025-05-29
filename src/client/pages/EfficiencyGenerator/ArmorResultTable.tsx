import { useMemo } from "react";
import { Legendary } from "../../utils/type";
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
  const rows = useMemo(
    () => [
      ...new Set(
        legendaries
          .filter((legendary) => legendary.type === "Armor")
          .map((legendary) => legendary.details?.type)
          .filter((type) => type !== undefined)
      ),
    ],
    [legendaries]
  );

  const legs = useMemo(() => {
    return legendaries.filter((legendary) => legendary.type === "Armor");
  }, [legendaries]);

  const getLegByWeightAndProv = (
    type: string,
    weight: string,
    prov: string
  ) => {
    return legs.filter(
      (legendary) =>
        legendary?.details.weight === weight &&
        legendary.details?.provenance === prov &&
        legendary?.details.type === type
    );
  };

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
          {rows.map((type) =>
            ["Light", "Medium", "Heavy"].map((weight) => (
              <TableRow key={`${type}-${weight}`}>
                <CustomTableCell className="type">
                  {weight} {type}
                </CustomTableCell>
                {["PvE", "HL", "WvW", "PvP"].map((prov) => (
                  <CustomTableCell key={`${type}-${weight}-${prov}`}>
                    {getLegByWeightAndProv(type, weight, prov).map(
                      (legendary) => (
                        <CustomDiv
                          key={legendary.id}
                          className={getClassName(legendary, selectedIds)}
                          onClick={() => handleId(legendary.id)}
                        >
                          <CustomImage
                            src={legendary.icon}
                            alt={legendary.name}
                          />
                          <span>{legendary.name}</span>
                        </CustomDiv>
                      )
                    )}
                  </CustomTableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
