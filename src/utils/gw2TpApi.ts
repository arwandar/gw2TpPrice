import { isAfter, sub } from "date-fns";
import { Item } from "./type";

type Data = {
  orderPrice: number;
  date: Date;
};

function percentile(arr: string | any[], p: number) {
  if (arr.length === 0) return 0;
  if (typeof p !== "number") throw new TypeError("p must be a number");
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];

  var index = (arr.length - 1) * p,
    lower = Math.floor(index),
    upper = lower + 1,
    weight = index % 1;

  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

const setupGoodPrice = (data: [number, number, number, number, number][]) => {
  const dataSet = data.reduce((toKeep: Data[], d) => {
    const date = new Date(d[0]);
    if (isAfter(date, sub(new Date(), { weeks: 1 })))
      toKeep.push({
        date,
        orderPrice: d[2],
      });
    return toKeep;
  }, []);

  return percentile(
    dataSet.map(({ orderPrice }) => orderPrice),
    75
  );
};

export const getPrices = async (shoppingList: Item[]) => {
  const newShoppingList: Item[] = [];
  try {
    for (let index in shoppingList) {
      const item = shoppingList[index];
      console.log("item", item);
      const res = await fetch(`/api/gw2tp/${item.id}`);
      // const res = await fetch(`http://localhost:5174/api/gw2tp/${item.id}`);
      const response = await res.json();
      newShoppingList.push({
        ...item,
        price: setupGoodPrice(response),
      });
      console.log(newShoppingList);
    }
  } catch (error) {
    console.error(error);
  }
  return newShoppingList;
};
