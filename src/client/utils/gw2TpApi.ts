import { isAfter, sub } from "date-fns";
import { Item } from "./type";
import { getId } from "./utils";

function percentile(arr: number[]) {
  const p = parseInt(localStorage.getItem("percentile") || "50") / 100;

  arr = arr.sort();

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
  const dataSet = data.reduce((toKeep: number[], d) => {
    const date = new Date(d[0]);
    if (isAfter(date, sub(new Date(), { weeks: 1 }))) toKeep.push(d[2]);
    return toKeep;
  }, []);

  return percentile(dataSet);
};

export const getPriceById = async (id: string): Promise<number> => {
  try {
    const res = await fetch(`/api/gw2tp/${id}`);
    const response = await res.json();
    const price = setupGoodPrice(response);

    return price;
  } catch (error) {
    console.error("getPrice", error);
    return 10000000;
  }
};

export const getPriceByLabel = (label: string) => {
  const id = getId(label);
  if (!id) return;
  return getPriceById(id);
};
