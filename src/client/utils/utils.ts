import dict from "./dict.json";
import { Item, Transaction } from "./type";

export const getId = (label: string) => {
  if (dict[label]) return dict[label];
};

export const getLabel = (idToFind: string) => {
  const res = Object.entries(dict).find(([label, id]) => id === idToFind);
  if (res) return res[0];
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
