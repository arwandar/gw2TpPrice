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

export type Legendary = {
  type: string;
  idLeg: number;
  idLegSkin: number;
  leg: string;
  idPrecu: number;
  idPrecuSkin: number;
  idPrecuAchiev: number;
  precu: string;
  idPerf: number;
  idPerfSkin: number;
  idPerfAchiev: number;
  perf: string;
  idProto: number;
  idProtoSkin: number;
  idProtoAchiev: number;
  proto: string;
  protoStatus?: Status;
  perfStatus?: Status;
  precuStatus?: Status;
  legStatus?: Status;
  iconLeg?: string;
  iconPrecu?: string;
  iconPerf?: string;
  iconProto?: string;
};

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
