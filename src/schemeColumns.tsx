import { Checkbox, CheckboxProps } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { useRef, useEffect } from 'react';
import { columnScheme } from './types';

export const schemeColumns: ColumnDef<columnScheme>[] = [
  {
    accessorKey: 'id',
    enableColumnFilter: false,
    header: ({ table }) => (
      <>
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </>
    ),
    cell: ({ row }) => (
      <>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </>
    ),
  },
  {
    accessorFn: (row) => row.name,
    id: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.sum,
    id: 'Sum',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.currency,
    id: 'Currency',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => info.getValue(),
    footer: ({ table }) =>
      table.getFilteredRowModel().rows.reduce((total, row) => total + (row.getValue('qty') as number), 0),
  },
  {
    accessorFn: (row) => row.volume,
    id: 'Volume',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.status,
    id: 'Status',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.delivery_date,
    id: 'Delivery date',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString('ru-Ru'),
  },
  {
    accessorFn: (row) => row.total,
    id: 'Total',
    cell: (info) => info.getValue(),
  },
];

export const IndeterminateCheckbox = ({ indeterminate, ...rest }: { indeterminate?: boolean } & CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return <Checkbox inputRef={ref} {...rest} />;
};
