import { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleListWithDelete() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data));
  }, []);

  const handleDelete = (id) => {
    // 1) Ask the user to confirm
    const ok = window.confirm('Delete this article?');
    if (!ok) return;

    // 2) Send the DELETE request
    axios.delete(`http://localhost:5000/articles/${id}`)
      .then(() => {
        // 3) Update state locally — remove the deleted article
        setArticles((prev) => prev.filter(a => a.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <ul>
      {articles.map(a => (
        <li key={a.id}>
          {a.title}
          <button onClick={() => handleDelete(a.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ArticleListWithDelete;