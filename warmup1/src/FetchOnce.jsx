import { useEffect, useState } from 'react';
import axios from 'axios';

function FetchOnce() {
  const [data, setData] = useState(null);   // initial value = null

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);   // empty dependency array = run once on mount

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default FetchOnce;