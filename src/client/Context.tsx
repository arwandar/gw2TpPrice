import { createContext, useEffect, useState } from "react";
import { Item, Transaction } from "./utils/type";
import { getCurrentOrders } from "./utils/gw2Api";
import { getPriceById } from "./utils/gw2TpApi";

export const Context = createContext<{
  effiencyShoppingList: Item[];
  setEfficiencyShoppingList: React.Dispatch<React.SetStateAction<Item[]>>;
  currentOrders: Transaction[];
  updateCurrentOrders: () => Promise<void>;
  prices: Record<string, number>;
  getPrice: (id: string) => void;
  resetPrices: () => void;
  isLoading: boolean;
}>({
  effiencyShoppingList: [],
  setEfficiencyShoppingList: () => {},
  currentOrders: [],
  updateCurrentOrders: () => Promise.resolve(),
  prices: {},
  getPrice: () => {},
  resetPrices: () => {},
  isLoading: false,
});

export const ContextProvider = ({ children }: { children: any }) => {
  const [effiencyShoppingList, setEfficiencyShoppingList] = useState<Item[]>(
    []
  );
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [currentOrders, setCurrentOrders] = useState<Transaction[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [priceQueue, setPriceQueue] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (priceQueue.length === 0) return;

      const current = priceQueue[0];

      if (!prices[current]) {
        const price = await getPriceById(current);
        setPrices((oldPrices) => ({ ...oldPrices, [current]: price }));
      }

      setPriceQueue((oldQueue) => [...oldQueue.slice(1)]);
    })();
  }, [priceQueue]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const apiKey = localStorage.getItem("apiKey");
      if (apiKey) await updateCurrentOrders();

      setLoading(false);
    })();
  }, [effiencyShoppingList]);

  const updateCurrentOrders = async () => {
    const localCurrentOrders = await getCurrentOrders();
    setCurrentOrders(localCurrentOrders);
    Promise.resolve();
  };

  const getPrice = (id: string) => {
    setPriceQueue((queue) => [...queue, id]);
  };

  const resetPrices = () => setPrices({});

  return (
    <Context.Provider
      value={{
        effiencyShoppingList,
        setEfficiencyShoppingList,
        currentOrders,
        updateCurrentOrders,
        prices,
        getPrice,
        resetPrices,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
