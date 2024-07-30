import { FormControlLabel, Grid, Popper, Switch } from "@mui/material";
import { Option as OptionType, isOption } from "../utils/type";
import { useEffect, useMemo, useState } from "react";

import Price from "./Price";
import WindowedSelect from "react-windowed-select";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { getOptions } from "../utils/utils";
import { getPriceById } from "../utils/gw2TpApi";
import { styled } from "@mui/material/styles";

const QuickPrice = () => {
  const [selectedOption, setSelectedOption] = useState<
    OptionType | undefined
  >();
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [isSelling, setSelling] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!selectedOption) {
        setSelectedPrice(undefined);
        return;
      }
      const price = await getPriceById(selectedOption?.id, isSelling);
      setSelectedPrice(price);
    })();
  }, [selectedOption, isSelling]);

  const handleSelectItem = (selected: unknown) => {
    console.log(selected);
    if (isOption(selected)) {
      setSelectedOption(selected);
    } else {
      setSelectedOption(undefined);
    }
  };
  const options = useMemo(
    () =>
      getOptions().sort((a, b) => {
        if (a?.type && b?.type)
          return (
            a?.type.localeCompare(b?.type) ||
            a.label.toUpperCase().localeCompare(b.label.toUpperCase())
          );

        return a.label.toUpperCase().localeCompare(b.label.toUpperCase());
      }),
    []
  );

  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: "border-box",
      "& ul": {
        padding: 0,
        margin: 0,
      },
    },
  });

  return (
    <Grid item container spacing={1}>
      <Grid item sx={{ width: "300px" }}>
        <WindowedSelect
          options={options}
          windowThreshold={100}
          onChange={handleSelectItem}
          isClearable
          isSearchable
          isOptionSelected={(a: unknown) =>
            isOption(a) ? a.id === selectedOption?.id : false
          }
        />
      </Grid>
      <Price price={selectedPrice} />
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
