export type Item = {
  id: string;
  name: string;
  count: number;
  price: number;
};

export type Transaction = {
  id: string;
  item_id: string;
  price: number;
  quantity: number;
  created: string;
};

export type Recipe = {
  id: string;
  name: string;
  recipeId: string;
  canBeSend: boolean;
  mainUnlocked?: boolean;
  secondaryUnlocked?: boolean;
};

export enum Stats {
  sinistre = "sinistre",
  viperrin = "vipérin",
  pionni = "pionni",
}
