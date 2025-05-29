import { Details } from "@mui/icons-material";

export type Item = {
  id: number;
  name: string;
  count: number;
  price: number;
};

export type Transaction = {
  id: string;
  item_id: number;
  price: number;
  quantity: number;
  created: string;
};

export type Recipe = {
  id: number;
  name: string;
  recipeId: number;
  canBeSend: boolean;
  mainUnlocked?: boolean;
  secondaryUnlocked?: boolean;
};

export enum Stats {
  sinistre = "sinistre",
  viperrin = "vipérin",
  pionni = "pionni",
}

export enum Status {
  notStarted = 0,
  started = 1,
  done = 2,
  crafted = 3,
}

type CommonLegendary = {
  id: number;
  maxCount: number;
  count?: number;
  name: string;
  icon: string;
};

export type WeaponLegendary = CommonLegendary & {
  type: "Weapon";
  details: {
    type: string;
    precuName?: string;
    extension: string;
  };
};

export type ArmorLegendary = CommonLegendary & {
  type: "Armor";
  details: {
    type: string;
    weight: string;
    provenance: string;
  };
};

export type OtherLegendary = CommonLegendary & {
  type: "Trinket" | "Back" | "UpgradeComponent" | "Relic";
  details: {
    provenance: string;
  };
};

export type Legendary = WeaponLegendary | ArmorLegendary | OtherLegendary;

export type Achievement = {
  id: number;
  current?: number;
  max?: number;
  done: boolean;
};

export type Trek = {
  id: number;
  nameEn: string;
  nameFr: string;
  mapFr: string;
  waypointFr: string;
  chatCode: string;
  searchFr: string;
};

export type Option = {
  id: number;
  label: string;
  type?: string;
};

export const isOption = (obj: unknown): obj is Option => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Option).id === "number" &&
    typeof (obj as Option).label === "string"
  );
};
