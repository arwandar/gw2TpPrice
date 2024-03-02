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
    padding: 0,
    verticalAlign: "middle",
  };
});

const CustomImage = styled("img")({
  height: "2rem",
  paddingRight: "0.5rem",
});

const CustomDiv = styled("div")({
  display: "flex",
  alignItems: "center",
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
        <CustomDiv>
          <CustomImage src={row.iconLeg} alt={row.leg} />
          <span>{row.leg}</span>
        </CustomDiv>
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("precu")}
        onClick={handleClick("idPrecu")}
      >
        <CustomDiv>
          <CustomImage src={row.iconPrecu} alt={row.precu} />
          <span>{row.precu}</span>
        </CustomDiv>
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("perf")}
        onClick={handleClick("idPerf")}
      >
        <CustomDiv>
          <CustomImage src={row.iconPerf} alt={row.perf} />
          <span>{row.perf}</span>
        </CustomDiv>
      </CustomTableCell>
      <CustomTableCell
        className={getClassName("proto")}
        onClick={handleClick("idProto")}
      >
        <CustomDiv>
          <CustomImage src={row.iconProto} alt={row.proto} />
          <span>{row.proto}</span>
        </CustomDiv>
      </CustomTableCell>
    </TableRow>
  );
};

export default Row;
