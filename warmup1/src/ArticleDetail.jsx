import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticleDetail() {
  const { id } = useParams();             // extract :id from URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </article>
  );
}

export default ArticleDetail;