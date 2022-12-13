import { InputBase } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { Table } from '@tanstack/react-table';

interface propsFiler {
  column: Column<any, any>;
  table: Table<any>;
}

export function Filter({ column, table }: propsFiler) {
  const typeValue = typeof table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  return typeValue === 'number' ? (
    <div>
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
      />
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
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
