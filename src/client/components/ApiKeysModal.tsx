import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { Key } from "@mui/icons-material";
import { useState } from "react";

const ApiKeysModal = ({ handleOpen }: { handleOpen: () => void }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const [mainApiKey, setMainApiKey] = useState<string>(
    localStorage.getItem("apiKey") || ""
  );
  const [secondaryApiKey, setSecondaryApiKey] = useState<string>(
    localStorage.getItem("secondaryApiKey") || ""
  );

  const handleChangeMainApiKey = (e: any) => {
    setMainApiKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  };

  const handleChangeSecondaryApiKey = (e: any) => {
    setSecondaryApiKey(e.target.value);
    localStorage.setItem("secondaryApiKey", e.target.value);
  };

  const handleClickMenu = () => {
    handleOpen();
    setOpen(true);
  };

  return (
    <>
      <MenuItem onClick={handleClickMenu}>
        <Key />
        Api Keys
      </MenuItem>
      <Dialog
        onClose={() => setOpen(false)}
        open={isOpen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Apis Keys</DialogTitle>
        <DialogContent>
          <TextField
            label="Main"
            value={mainApiKey || ""}
            onChange={handleChangeMainApiKey}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Secondary"
            value={secondaryApiKey || ""}
            onChange={handleChangeSecondaryApiKey}
            fullWidth
            variant="standard"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeysModal;
