import items from "./items.json";
import { Option as OptionType } from "./type";

export const getId = (label: string) => {
  if (items[label]) return items[label];
};

export const getBuyableId = (id: string) => {
  const localId = parseInt(id);
  return Object.values(items).includes(localId) ? localId : 0;
};

export const getLabel = (idToFind: number) => {
  const res = Object.entries(items).find(([, id]) => id === idToFind);
  if (res) return res[0];
};

export const splitPrice = (price: number) => {
  const isNeg = price < 0;
  price = Math.abs(price);

  const str = price.toString().padStart(5, "0");

  const pc = Number.parseInt(str.slice(-2), 10);
  const pa = Number.parseInt(str.slice(-4, -2), 10);
  const po = Number.parseInt(str.slice(0, -4), 10);
  return { isNeg, pc, pa, po };
};

const getType = (label: string, id: number) => {
  if (label.includes("Lingot") || label.includes("Minerai")) return "Metaux";
  if (label.includes("Planche") || label.includes("Rondin")) return "Bois";
  if (label.includes("Segment") || label.includes("Pièce de cuir"))
    return "Cuir";

  if ([24295, 24358, 24351, 24277, 24357, 24289, 24300, 24283].includes(id))
    return "T6";
  if ([24294, 24341, 24350, 24276, 24356, 24288, 24299, 24282].includes(id))
    return "T5";

  return "XXX";
};

export const getOptions: () => OptionType[] = () =>
  Object.entries(items).map(([label, id]) => ({
    label,
    id,
    type: getType(label, id),
  }));

export const getSortIcon = (
  key: string,
  sort: { key: string; order: "asc" | "desc" }
) => (sort.key === key ? (sort.order === "asc" ? "▲" : "▼") : "");
