import { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]); // initial value = empty array

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data));
  }, []);

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <strong>{article.title}</strong>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
