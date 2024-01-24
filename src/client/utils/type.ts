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
