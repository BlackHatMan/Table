import { faker } from '@faker-js/faker';
import { Product } from './types';

const newResponse = (): Product => {
  return {
    id: faker.random.numeric(6),
    status: faker.helpers.shuffle<Product['status']>(['active', 'archive'])[0]!,
    sum: Number.parseInt(faker.finance.amount(10, 500)),
    qty: faker.datatype.number(199),
    volume: faker.datatype.number({ min: 5, max: 100 }),
    name: faker.commerce.productName(),
    delivery_date: faker.date.recent(30).toISOString(),
    currency: faker.finance.currencyCode(),
  };
};

export function makeData(lens: number) {
  return new Array(lens).fill(1).map(() => {
    return newResponse();
  });
}
