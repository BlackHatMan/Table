import { useState, useEffect } from 'react';
import { makeData, Response } from './fakeData';
import { TableLocal } from './TableLocal';

function App() {
  const [data, setDate] = useState<Response[]>();

  useEffect(() => {
    const endpoint1 = makeData(5);
    const endpoint2 = makeData(5);
    setDate([...endpoint1, ...endpoint2]);
  }, []);

  if (!data) {
    return null;
  }
  return <TableLocal data={data} />;
}
export default App;
