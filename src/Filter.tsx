import { TextField, styled, Box } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { Table } from '@tanstack/react-table';
import { FC } from 'react';

interface propsFiler {
  column: Column<any, any>;
  table: Table<any>;
}

const StyledTextField = styled(TextField)({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& ::placeholder': {
    fontSize: '0.875rem',
  },
});

export const Filter: FC<propsFiler> = ({ column, table }) => {
  const typeValue = typeof table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  return typeValue === 'number' ? (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '0.8rem' }}>
      <StyledTextField
        variant="standard"
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`min`}
      />
      <StyledTextField
        variant="standard"
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`max`}
      />
    </Box>
  ) : (
    <StyledTextField
      variant="standard"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`search by ${column.id.slice(0, 8)}`}
      inputProps={{ 'aria-label': 'search' }}
    />
  );
};
