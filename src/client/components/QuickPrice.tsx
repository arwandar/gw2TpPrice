import {
  Autocomplete,
  FormControlLabel,
  Grid,
  ListSubheader,
  Popper,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getOptions, priceToString } from "../utils/utils";
import { styled, useTheme } from "@mui/material/styles";

import { autocompleteClasses } from "@mui/material/Autocomplete";
import { getPriceByLabel } from "../utils/gw2TpApi";

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

function useResetCache(data: any) {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement) => itemSize;

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const QuickPrice = () => {
  const [input, setInput] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [isSelling, setSelling] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!input) setSelectedPrice(undefined);
      const price = await getPriceByLabel(input, isSelling);
      setSelectedPrice(price);
    })();
  }, [input, isSelling]);

  const handleSelectItem = async (e: any) => {
    setInput(e.target.value);
  };

  const options = useMemo(
    () =>
      getOptions().sort((a: string, b: string) =>
        a.toUpperCase().localeCompare(b.toUpperCase())
      ),
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
      <Grid item>
        <Autocomplete
          disableListWrap
          PopperComponent={StyledPopper}
          ListboxComponent={ListboxComponent}
          onSelect={handleSelectItem}
          options={options}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Item" />}
          renderOption={(props, option, state) =>
            [props, option, state.index] as React.ReactNode
          }
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