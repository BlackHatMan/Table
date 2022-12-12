import { ColumnDef } from '@tanstack/react-table';
import { Response } from './fakeData';

export const columns: ColumnDef<Response>[] = [
  {
    header: 'smart table',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.sum,
        id: 'sum',
        cell: (info) => info.getValue(),
        header: () => 'sum',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.currency,
        id: 'currency',
        header: () => 'currency',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.qty,
        id: 'qty',
        header: () => 'quantity',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.volume,
        id: 'volume',
        header: () => 'volume',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: () => 'status',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.delivery_date,
        id: 'delivery_date',
        header: () => 'delivery date',
        footer: (props) => props.column.id,
      },
    ],
  },
];
