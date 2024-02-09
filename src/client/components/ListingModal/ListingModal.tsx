import {
  Dialog,
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Row, { RowType } from "./Row";
import { useEffect, useState } from "react";

import { getLabel } from "../../utils/utils";
import { getPriceById } from "../../utils/gw2TpApi";

const ListingModal = ({
  idList,
  isSelling = true,
  handleOpen,
  title,
}: {
  idList: number[];
  isSelling?: boolean;
  handleOpen: () => void;
  title: string | undefined;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<RowType[]>(
    idList.map((id) => ({ id, price: -1, label: getLabel(id) }))
  );

  const handleClickMenu = () => {
    handleOpen();
    setOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      idList.forEach(async (id) => {
        const price = await getPriceById(id, isSelling);
        setRows((oldRows) =>
          oldRows.map((row) => (row.id === id ? { ...row, price } : row))
        );
      });
    }
  }, [idList, isOpen]);

  return (
    <>
      <MenuItem onClick={handleClickMenu}>{title}</MenuItem>
      <Dialog onClose={() => setOpen(false)} open={isOpen} maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <TableContainer>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Label</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};

export default ListingModal;
