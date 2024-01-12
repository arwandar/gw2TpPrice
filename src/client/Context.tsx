import { createContext, useEffect, useState } from "react";
import { Item, Transaction } from "./utils/type";
import { getCurrentOrders } from "./utils/gw2Api";
import { calculateNeededPriceIds } from "./utils/utils";
import { getPriceById } from "./utils/gw2TpApi";

export const Context = createContext<{
  effiencyShoppingList: Item[];
  setEfficiencyShoppingList: React.Dispatch<React.SetStateAction<Item[]>>;
  currentOrders: Transaction[];
  updateCurrentOrders: () => Promise<void>;
  prices: Record<string, number>;
  isLoading: boolean;
}>({
  effiencyShoppingList: [],
  setEfficiencyShoppingList: () => {},
  currentOrders: [],
  updateCurrentOrders: () => Promise.resolve(),
  prices: {},
  isLoading: false,
});

export const ContextProvider = ({ children }: { children: any }) => {
  const [effiencyShoppingList, setEfficiencyShoppingList] = useState<Item[]>(
    []
  );
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [currentOrders, setCurrentOrders] = useState<Transaction[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // const updateCurrentOrders = () => getCurrentOrders().then(setCurrentOrders);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const apiKey = localStorage.getItem("apiKey");
      if (currentOrders.length === 0 && apiKey) await updateCurrentOrders();

      let neededPriceIds = calculateNeededPriceIds(
        effiencyShoppingList,
        currentOrders
      );

      for (const id of neededPriceIds) {
        const price = await getPriceById(id);
        await setPrices((oldPrices) => ({ ...oldPrices, [id]: price }));
      }

      setLoading(false);
    })();
  }, [effiencyShoppingList, currentOrders]);

  const updateCurrentOrders = async () => {
    const localCurrentOrders = await getCurrentOrders();
    setCurrentOrders(localCurrentOrders);
    Promise.resolve();
  };

  return (
    <Context.Provider
      value={{
        effiencyShoppingList,
        setEfficiencyShoppingList,
        currentOrders,
        updateCurrentOrders,
        prices,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
