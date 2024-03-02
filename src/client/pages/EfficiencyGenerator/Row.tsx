import { Legendary, Status } from "../../utils/type";
import { TableCell, TableRow, styled } from "@mui/material";

const CustomTableCell = styled(TableCell)(({ theme, className }) => {
  let backgroundColor = undefined;
  let opacity = undefined;

  if (className?.includes("status-1")) {
    backgroundColor = theme.palette.grey[100];
  }
  if (className?.includes("status-2")) {
    backgroundColor = theme.palette.grey[300];
  }
  if (className?.includes("status-3")) {
    backgroundColor = theme.palette.grey[500];
  }

  if (className?.includes("selected")) {
    backgroundColor = theme.palette.primary.main;
  }

  return {
    backgroundColor,
    opacity,
  };
});

const Row = ({
  row,
  selectedIds,
  handleId,
}: {
  row: Legendary;
  selectedIds: number[];
  handleId: (id: number) => void;
}) => {
  const handleClick =
    (type: "idLeg" | "idPrecu" | "idPerf" | "idProto") => () => {
      handleId(row[type]);
    };

  const getClassName = (type: "leg" | "precu" | "perf" | "proto") => {
    let id;
    let status: Status;

    switch (type) {
      case "leg":
        id = row.idLeg;
        status = row.legStatus || Status.notStarted;
        break;
      case "precu":
        id = row.idPrecu;
        status = row.precuStatus || Status.notStarted;
        break;
      case "perf":
        id = row.idPerf;
        status = row.perfStatus || Status.notStarted;
        break;
      case "proto":
        id = row.idProto;
        status = row.protoStatus || Status.notStarted;
        break;
    }

    const classNames = [];

    if (status) {
      classNames.push(`status-${status}`);
    }
    if (selectedIds.includes(id)) {
      classNames.push("selected");
    }

    return classNames.join(" ");
  };

  return (
    <TableRow
      key={row.idLeg}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <CustomTableCell
        className={getClassName("leg")}
        onClick={handleClick("idLeg")}
      >
        {row.leg}
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("precu")}
        onClick={handleClick("idPrecu")}
      >
        {row.precu}
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("perf")}
        onClick={handleClick("idPerf")}
      >
        {row.perf}
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("proto")}
        onClick={handleClick("idProto")}
      >
        {row.proto}
      </CustomTableCell>
    </TableRow>
  );
};

export default Row;
