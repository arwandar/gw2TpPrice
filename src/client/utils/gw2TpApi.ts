import { isAfter, sub } from "date-fns";

import { getId } from "./utils";

export const getPriceById = async (
  id: number,
  isSelling: boolean = false
): Promise<number> => {
  try {
    const res = await fetch(`/api/gw2tp/${id}`);
    const data = await res.json();

    const dataSet = data
      .reduce((toKeep: number[], d: number[]) => {
        const date = new Date(d[0]);
        if (isAfter(date, sub(new Date(), { weeks: 1 })))
          toKeep.push(d[isSelling ? 1 : 2]);
        return toKeep;
      }, [])
      .sort();

    const p = parseInt(localStorage.getItem("percentile") || "50") / 100;

    if (dataSet.length === 0) return 0;
    if (typeof p !== "number") throw new TypeError("p must be a number");
    if (p <= 0) return dataSet[0];
    if (p >= 1) return dataSet[dataSet.length - 1];

    const index = (dataSet.length - 1) * p,
      lower = Math.floor(index),
      upper = lower + 1,
      weight = index % 1;

    if (upper >= dataSet.length) return dataSet[lower];
    return dataSet[lower] * (1 - weight) + dataSet[upper] * weight;
  } catch (error) {
    console.error("getPrice", error);
    return 10000000;
  }
};

export const getPriceByLabel = (label: string, isSelling?: boolean) => {
  const id = getId(label);
  if (!id) return;
  return getPriceById(id, isSelling);
};

export const getCurrentPercentile = async (
  id: number,
  value: number,
  isSelling: boolean = false
) => {
  try {
    const res = await fetch(`/api/gw2tp/${id}`);
    const data = await res.json();

    const dataSet = data.reduce((toKeep: number[], d: number[]) => {
      const date = new Date(d[0]);
      if (isAfter(date, sub(new Date(), { weeks: 1 })))
        toKeep.push(d[isSelling ? 1 : 2]);
      return toKeep;
    }, []);

    let count = 0;
    dataSet.forEach((v: number) => {
      if (v < value) {
        count++;
      } else if (v == value) {
        count += 0.5;
      }
    });

    return (100 * count) / dataSet.length;
  } catch (error) {
    console.error(error);
    return 10000000;
  }
};
