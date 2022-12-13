import { useState, useEffect } from 'react';
import { makeData, Products } from './fakeData';
import { TableLocal } from './TableLocal';

function App() {
  const [data, setDate] = useState<Products[]>();

  useEffect(() => {
    const endpoint1 = makeData(5);
    const endpoint2 = makeData(5);

    const sortByDate = [...endpoint1, ...endpoint2]
      .sort((a, b) => new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime())
      .map((el) => {
        return {
          ...el,
          delivery_date: new Date(el.delivery_date).toLocaleDateString(),
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
