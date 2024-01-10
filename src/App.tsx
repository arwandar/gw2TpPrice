import { useEffect, useMemo, useState } from "react";

import "./App.css";
import ApiKeyInput from "./components/ApiKeyInput/ApiKeyInput";
import ImportShoppingList from "./components/ImportShoppingListInput/ImportShoppingListInput";
import { getCurrentOrders } from "./utils/gw2Api";
import {
  getOptions,
  priceToString,
  updateEfficiencyShoppingList,
} from "./utils/utils";
import { Item } from "./utils/type";
import ResultTable from "./components/ResultTable/ResultTable";
import { Update } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { getPrice, getPrices } from "./utils/gw2TpApi";

function App() {
  const [apiKey, setApiKey] = useState<string>("");

  const [effiencyShoppingList, setEfficiencyShoppingList] = useState<Item[]>(
    []
  );
  const [currentOrders, setCurrentOrders] = useState<{
    [index: string]: number;
  }>({});
  const [toBuy, setToBuy] = useState<Item[]>([]);

  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const updateCurrentOrders = () =>
    getCurrentOrders(apiKey).then(setCurrentOrders);

  useEffect(() => {
    if (effiencyShoppingList.length > 0)
      updateCurrentOrders()
        .then(() =>
          updateEfficiencyShoppingList(effiencyShoppingList, currentOrders)
        )
        .then((shoppingList) => getPrices(shoppingList))
        .then(setToBuy);
  }, [effiencyShoppingList]);

  const options = useMemo(() => getOptions(), []);

  const handleSelectItem = (e: any) => {
    getPrice(e.target.value).then(setSelectedPrice);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <ImportShoppingList setShoppingList={setEfficiencyShoppingList} />
        <Button
          component="label"
          variant="outlined"
          startIcon={<Update />}
          onClick={updateCurrentOrders}
        >
          Update Current Order
        </Button>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onSelect={handleSelectItem}
          options={options}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
        <TextField
          id="apiKey"
          label="Price "
          value={priceToString(selectedPrice)}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
      </div>
      <div>
        <ResultTable shoppingList={toBuy} />
      </div>
    </>
  );
}

export default App;
