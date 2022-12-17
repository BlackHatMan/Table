export type Product = {
  id: string;
  status: 'active' | 'archive';
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
};

export type columnScheme = Product & { total: string };
