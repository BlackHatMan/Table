import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

import {
  Column,
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { makeData, Response } from './fakeData';

export const TableMui = () => {
  const columns = useMemo<ColumnDef<Response>[]>(
    () => [
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
    ],
    []
  );

  const [data] = useState(() => makeData(10));

  return <LocalTable {...{ data, columns }} />;
};

function LocalTable({ data, columns }: { data: Response[]; columns: ColumnDef<Response>[] }) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
function Filter({ column, table }: { column: Column<any, any>; table: ReactTable<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div>
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
      />
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  ) : (
    <InputBase
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      inputProps={{ 'aria-label': 'search' }}
    />
  );
}
