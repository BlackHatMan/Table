import { useState, useEffect } from 'react';
import { makeData } from './fakeData';
import { TableLocal } from './TableLocal';
import { columnScheme } from './types';

function App() {
  const [data, setDate] = useState<columnScheme[]>();

  useEffect(() => {
    const endpoint1 = makeData(4);
    const endpoint2 = makeData(4);

    const sortByDate = [...endpoint1, ...endpoint2]
      .sort((a, b) => new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime())
      .map((product) => {
        return {
          ...product,
          total: (product.qty + product.sum).toString() + ' - ' + product.currency,
        };
      });

    setDate(sortByDate);
  }, []);

  if (!data) {
    return null;
  }
  return <TableLocal data={data} />;
}
export default App;
