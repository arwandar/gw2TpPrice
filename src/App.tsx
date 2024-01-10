import { useEffect, useState } from "react";

import "./App.css";
import ApiKeyInput from "./components/ApiKeyInput/ApiKeyInput";
import ImportShoppingList from "./components/ImportShoppingListInput/ImportShoppingListInput";
import { getCurrentOrders } from "./utils/gw2Api";
import { updateEfficiencyShoppingList } from "./utils/utils";
import { Item } from "./utils/type";
import ResultTable from "./components/ResultTable/ResultTable";
import { Update } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getPrices } from "./utils/gw2TpApi";

function App() {
  const [apiKey, setApiKey] = useState<string>("");

  const [effiencyShoppingList, setEfficiencyShoppingList] = useState<Item[]>(
    []
  );
  const [currentOrders, setCurrentOrders] = useState<{
    [index: string]: number;
  }>({});
  const [toBuy, setToBuy] = useState<Item[]>([]);

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

  return (
    <>
      <div>
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
      </div>
      <div>
        <ResultTable shoppingList={toBuy} />
      </div>
    </>
  );
}

export default App;
