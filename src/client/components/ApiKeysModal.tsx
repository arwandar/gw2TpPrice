import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
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

  const [mainStorageMax, setMainStorageMax] = useState<number>(
    parseInt(localStorage.getItem("mainStorageMax") || "0", 10)
  );

  const [secondaryStorageMax, setSecondaryStorageMax] = useState<number>(
    parseInt(localStorage.getItem("secondaryStorageMax") || "0", 10)
  );

  const handleChangeMainApiKey = (e: any) => {
    setMainApiKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  };

  const handleChangeSecondaryApiKey = (e: any) => {
    setSecondaryApiKey(e.target.value);
    localStorage.setItem("secondaryApiKey", e.target.value);
  };

  const handleMainStorageMaxChange = (e: any) => {
    setMainStorageMax(e.target.value);
    localStorage.setItem("mainStorageMax", e.target.value);
  };

  const handleSecondaryStorageMaxChange = (e: any) => {
    setSecondaryStorageMax(e.target.value);
    localStorage.setItem("secondaryStorageMax", e.target.value);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Main"
              value={mainApiKey || ""}
              onChange={handleChangeMainApiKey}
              variant="standard"
              sx={{ width: "80%" }}
            />
            <Input
              type="number"
              value={mainStorageMax}
              onChange={handleMainStorageMaxChange}
              sx={{ width: "15%" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Secondary"
              value={secondaryApiKey || ""}
              onChange={handleChangeSecondaryApiKey}
              sx={{ width: "80%" }}
              variant="standard"
            />
            <Input
              type="number"
              value={secondaryStorageMax}
              onChange={handleSecondaryStorageMaxChange}
              sx={{ width: "15%" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeysModal;
