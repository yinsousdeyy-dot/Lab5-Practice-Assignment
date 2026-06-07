import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditArticle() {
  const { id } = useParams();
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');

  // 1) Load existing article and prefill the form
  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => {
        setTitle(res.data.title); // prefills the title state
        setContent(res.data.content); // prefills the content state
      });
  }, [id]);

  // 2) Submit the update
  const handleUpdate = (e) => {
    e.preventDefault();
    // put or patch
    axios.put(`http://localhost:5000/articles/${id}`, { title, content })
      .then(() => alert('Article updated!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title}   onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditArticle;