import { Grid, Autocomplete, TextField } from "@mui/material";
import { getOptions, priceToString } from "../../utils/utils";
import { useMemo, useState } from "react";
import { getPriceByLabel } from "../../utils/gw2TpApi";

const QuickPrice = () => {
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const handleSelectItem = async (e: any) => {
    const price = await getPriceByLabel(e.target.value);
    if (price) setSelectedPrice(price);
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
    </Grid>
  );
};

export default QuickPrice;
