import { Button } from "@mui/material";
import { useState } from "react";
import { RateReview } from "@mui/icons-material";

const CurrentOrderModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

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
    </>
  );
};

export default CurrentOrderModal;
