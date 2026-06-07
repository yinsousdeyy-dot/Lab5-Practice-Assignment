import { useState } from 'react';
import axios from 'axios';

function AddArticle() {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();   // prevent the default page reload

    axios.post('http://localhost:5000/articles', {
      title,
      content,
      journalistId: 1,
      categoryId: 1,
    })
      .then(res => {
        alert('Created article #' + res.data.id);
        setTitle('');
        setContent('');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default AddArticle;
