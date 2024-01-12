import {
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { RateReview } from "@mui/icons-material";
import { Context } from "../../Context";
import Row from "./Row";

const CurrentOrderModal = () => {
  const { currentOrders, updateCurrentOrders } = useContext(Context);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) updateCurrentOrders();
  }, [isOpen]);

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<RateReview />}
        onClick={() => setOpen(true)}
      >
        View Orders
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={isOpen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Current Orders</DialogTitle>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Label</TableCell>
                <TableCell align="right">Qt</TableCell>
                <TableCell align="right">Offer</TableCell>
                <TableCell align="right">Best</TableCell>
                <TableCell align="right">Percentile</TableCell>
                <TableCell align="right">Creation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((row) => (
                <Row row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};

export default CurrentOrderModal;
