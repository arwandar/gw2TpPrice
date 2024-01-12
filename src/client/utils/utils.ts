import dict from "./dict.json";
import { Item, Transaction } from "./type";

export const calculateNeededPriceIds = (
  efficiencyShoppingList: Item[],
  currentOrders: Transaction[]
) => {
  const currentOrdersSet = currentOrders.reduce(
    (list: { [x: string]: number }, item: Transaction) => {
      if (!list[item.item_id]) list[item.item_id] = 0;
      list[item.item_id] += item.quantity;
      return list;
    },
    {}
  );

  return efficiencyShoppingList
    .map((item: Item) => {
      if (currentOrdersSet[item.id]) {
        item.count -= currentOrdersSet[item.id];
      }
      return item;
    })
    .filter((item) => item.count >= 0)
    .map(({ id }) => id);
};

export const getId = (label: string) => {
  if (dict[label]) return dict[label];
};

export const priceToString = (price: number | undefined) => {
  if (!price) return "";
  const isNeg = price < 0;
  price = Math.abs(price);

  const str = price.toString();

  const pc = Number.parseInt(str.slice(-2));
  const pa = Number.parseInt(str.slice(-4, -2));
  const po = Number.parseInt(str.slice(0, -4));

  let res = `${pc} PC`;
  if (pa || po) res = `${pa} PA ${res}`;
  if (po) res = `${po} PO ${res}`;
  if (isNeg) res = `- ${res}`;

  return res;
};

export const getOptions = () => Object.keys(dict).map((label) => label);
