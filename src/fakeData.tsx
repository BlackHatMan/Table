import { faker } from '@faker-js/faker';

export type Response = {
  id: string;
  status: 'active' | 'archive';
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
};

const newResponse = (): Response => {
  return {
    id: faker.random.numeric(6),
    status: faker.helpers.shuffle<Response['status']>(['active', 'archive'])[0]!,
    sum: Number.parseInt(faker.finance.amount(10, 500)),
    qty: faker.datatype.number(199),
    volume: faker.datatype.number({ min: 5, max: 100 }),
    name: faker.commerce.productName(),
    delivery_date: faker.date.recent(30).toISOString(),
    currency: faker.finance.currencyCode(),
  };
};

export function makeData(lens: number) {
  const arr = new Array(lens).fill(1);
  return arr.map(() => {
    return newResponse();
  });
}
