import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.content.trim()) {
      setError('Content is required');
      return;
    }
    if (!form.journalistId) {
      setError('Journalist ID is required');
      return;
    }
    if (!form.categoryId) {
      setError('Category ID is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const articleData = {
        title: form.title,
        content: form.content,
        journalistId: parseInt(form.journalistId),
        categoryId: parseInt(form.categoryId)
      };
      
      console.log('Sending data:', articleData); // Debug log
      
      const response = await axios.post('http://localhost:5000/articles', articleData);
      console.log('Response:', response.data); // Debug log
      
      // Navigate back to articles list on success
      navigate('/');
    } catch (err) {
      console.error('Full error:', err); // Debug log
      console.error('Error response:', err.response); // Debug log
      setError(`Failed to create article: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Create New Article</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
        <input 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Title" 
          required 
        /><br />
        <textarea 
          name="content" 
          value={form.content} 
          onChange={handleChange} 
          placeholder="Content" 
          required 
          rows="5"
          style={{ width: '300px' }}
        /><br />
        <input 
          name="journalistId" 
          value={form.journalistId} 
          onChange={handleChange} 
          placeholder="Journalist ID" 
          type="number"
          required 
        /><br />
        <input 
          name="categoryId" 
          value={form.categoryId} 
          onChange={handleChange} 
          placeholder="Category ID" 
          type="number"
          required 
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Add'}
        </button>
      </form>
    </div>
  );
}