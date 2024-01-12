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
