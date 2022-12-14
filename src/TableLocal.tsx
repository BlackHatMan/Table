import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { Button, Paper, Popover, styled, Typography } from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { schemeColumns } from './schemeColumns';
import { Filter } from './Filter';
import { columnScheme } from './types';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const TableLocal = ({ data }: { data: columnScheme[] }) => {
  const columns = useMemo(() => schemeColumns, []);
  const [anchorPopup, setAnchorPopup] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPopup(anchorPopup ? null : event.currentTarget);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: true,
  });

  const selectedId = table.getSelectedRowModel().flatRows.map((row) => row.original.id);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    table.resetColumnFilters();
    table.resetRowSelection();
    try {
      await fetch('wwww.viditasystems.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedId),
      });
    } catch (e) {}

    setAnchorPopup(null);
  };

  return (
    <Box sx={{ maxWidth: '100%', width: 1440, margin: '100px auto' }}>
      <TableContainer component={Paper} sx={{ margin: '100px auto', backgroundColor: 'black' }}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow sx={{ verticalAlign: 'baseline' }}>
              {table.getFlatHeaders().map((header) => {
                return (
                  <TableCell key={header.id} sx={{ padding: 1, fontSize: '1rem', fontWeight: 'bold' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} sx={{ padding: 1 }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <StyledTableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableFooter>
        </Table>
      </TableContainer>
      <Button disabled={!selectedId.length} variant="contained" color="error" onClick={handleClick}>
        ????????????????????????
      </Button>
      <Popover
        open={!!anchorPopup}
        anchorEl={anchorPopup}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClick}
      >
        <Box component="form" onSubmit={submitHandler} sx={{ border: 1, p: 2, borderRadius: 2 }}>
          <Typography>???? ?????????????? ?????? ???????????? ???????????????????????? ????????????:</Typography>
          <ul>
            {table.getSelectedRowModel().flatRows.map((row, i) => {
              return (
                <li key={row.id + i}>
                  <Typography>{row.original.name}</Typography>
                </li>
              );
            })}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="outlined" color="warning">
              ??????????????????
            </Button>
            <Button onClick={handleClick} variant="outlined" color="success">
              ??????????????????
            </Button>
          </div>
        </Box>
      </Popover>
    </Box>
  );
};
