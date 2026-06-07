import { useEffect, useState } from 'react';
import axios from 'axios';

function SafeFetch() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);   // start in loading state
  const [error, setError]       = useState(null);   // no error initially

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data))
      .catch(err => setError(err.message))            // store the error message
      .finally(() => setLoading(false));             // stop loading either way
  }, []);

  if (loading) return <p>Loading...</p>;                  // e.g. "Loading..."
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;

  return <p>Loaded {articles.length} articles.</p>;
}

export default SafeFetch;