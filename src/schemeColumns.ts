import { ColumnDef } from '@tanstack/react-table';
import { Response } from './fakeData';

export const schemeColumns: ColumnDef<Response>[] = [
  {
    accessorFn: (row) => row.name,
    id: 'Name',
  },
  {
    accessorFn: (row) => row.sum,
    id: 'Sum',
  },
  {
    accessorFn: (row) => row.currency,
    id: 'Currency',
  },
  {
    accessorFn: (row) => row.qty,
    id: 'Quantity',
  },
  {
    accessorFn: (row) => row.volume,
    id: 'Volume',
  },
  {
    accessorFn: (row) => row.status,
    id: 'Status',
  },
  {
    accessorFn: (row) => row.delivery_date,
    id: 'delivery_date',
    header: () => 'Delivery date',
  },
];
