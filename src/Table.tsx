import { useMemo } from 'react';
import { getCoreRowModel, ColumnDef, flexRender, useReactTable } from '@tanstack/react-table';
import { makeData, Response } from './fakeData';
import './table.css';

const columns: ColumnDef<Response>[] = [
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

export const Table = () => {
  const data = useMemo(() => makeData(10), []);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div>
      <div />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ position: 'relative', width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                      ></div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div />
    </div>
  );
};
