import dict from "./dict.json";

export const updateEfficiencyShoppingList = (
  efficiencyShoppingList: any[],
  currentOrders: { [x: string]: number }
) => {
  console.log(efficiencyShoppingList, currentOrders);
  return efficiencyShoppingList
    .map((item) => {
      if (currentOrders[item.id]) {
        item.count -= currentOrders[item.id];
      }
      return item;
    })
    .filter((item) => item.count >= 0);
};

export const getId = (label: string) => {
  if (dict[label]) return dict[label];
};

export const priceToString = (price: number | undefined) => {
  if (!price) return "";

  const str = price.toString();

  const pc = Number.parseInt(str.slice(-2));
  const pa = Number.parseInt(str.slice(-4, -2));
  const po = Number.parseInt(str.slice(0, -4));

  let res = `${pc} PC`;
  if (pa || po) res = `${pa} PA ${res}`;
  if (po) res = `${po} PO ${res}`;

  return res;
};
