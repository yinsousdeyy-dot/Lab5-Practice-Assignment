import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function UpdateArticleForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        const article = response.data;
        setForm({
          title: article.title,
          content: article.content,
          journalistId: article.journalistId,
          categoryId: article.categoryId,
        });
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article data');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
      
      const updatedData = {
        title: form.title,
        content: form.content,
        journalistId: parseInt(form.journalistId),
        categoryId: parseInt(form.categoryId)
      };
      
      // Update article with axios
      await axios.put(`http://localhost:5000/articles/${id}`, updatedData);
      
      // Navigate back to articles list on success
      navigate('/');
    } catch (err) {
      console.error('Error updating article:', err);
      setError('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.title) return <div>Loading article data...</div>;

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <h3>Update Article</h3>
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
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/')}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}