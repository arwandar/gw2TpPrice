import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMemo, useState } from "react";

import { Trek } from "../../utils/type";

const DialogResult = ({ selectedTreks }: { selectedTreks: Trek[] }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const strings: string[] = useMemo(() => {
    const localSelectedTreks = [
      ...selectedTreks.sort((a, b) => a.mapFr.localeCompare(b.mapFr)),
    ];
    const results = [];
    do {
      let treks = localSelectedTreks.splice(0, 5);
      results.push(
        treks
          .map(
            (trek, index) => `${index + 1}. ${trek.chatCode}: ${trek.nameEn}`
          )
          .join(" | ")
      );
    } while (localSelectedTreks.length > 0);

    return results;
  }, [selectedTreks, isOpen]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Export</Button>
      <Dialog onClose={() => setOpen(false)} open={isOpen} maxWidth="md">
        <DialogTitle>Treks</DialogTitle>
        <DialogContent>
          {strings.map((string) => (
            <DialogContentText
              key={string}
              sx={{ marginBottom: "2rem" }}
              onClick={() => navigator.clipboard.writeText(string)}
            >
              {string}
            </DialogContentText>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DialogResult;
