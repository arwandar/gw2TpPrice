import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { getOptions, priceToString } from "../utils/utils";
import { useEffect, useMemo, useState } from "react";

import { getPriceByLabel } from "../utils/gw2TpApi";

const QuickPrice = () => {
  const [input, setInput] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [isSelling, setSelling] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const price = await getPriceByLabel(input, isSelling);
      if (price) setSelectedPrice(price);
    })();
  }, [input, isSelling]);

  const handleSelectItem = async (e: any) => {
    setInput(e.target.value);
  };

  const options = useMemo(() => getOptions(), []);

  return (
    <Grid item container spacing={1}>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onSelect={handleSelectItem}
          options={options}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      </Grid>
      <Grid item>
        <TextField
          id="apiKey"
          label="Price "
          value={priceToString(selectedPrice)}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              checked={!isSelling}
              onChange={() => setSelling(!isSelling)}
            />
          }
          label="Buy"
        />
      </Grid>
    </Grid>
  );
};

export default QuickPrice;
