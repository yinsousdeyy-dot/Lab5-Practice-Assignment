import { useEffect, useState } from 'react';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all data when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Simulated API call - replace with actual API endpoint
    const response = await fetch('https://api.example.com/articles');
    const data = await response.json();
    setArticles(data);
    setFilteredArticles(data);
  };

  const fetchJournalists = async () => {
    // Simulated API call - replace with actual API endpoint
    const response = await fetch('https://api.example.com/journalists');
    const data = await response.json();
    setJournalists(data);
  };

  const fetchCategories = async () => {
    // Simulated API call - replace with actual API endpoint
    const response = await fetch('https://api.example.com/categories');
    const data = await response.json();
    setCategories(data);
  };

  const applyFilters = () => {
    let filtered = [...articles];
    
    if (selectedJournalist) {
      filtered = filtered.filter(article => 
        article.journalistId === parseInt(selectedJournalist)
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(article => 
        article.categoryId === parseInt(selectedCategory)
      );
    }
    
    setFilteredArticles(filtered);
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
    setFilteredArticles(articles);
  };

  const getJournalistName = (id) => {
    const journalist = journalists.find(j => j.id === id);
    return journalist ? journalist.name : `Journalist #${id}`;
  };

  const getCategoryName = (id) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : `Category #${id}`;
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select 
          id="journalistFilter" 
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select 
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {filteredArticles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By {getJournalistName(article.journalistId)} | 
              Category: {getCategoryName(article.categoryId)}
            </small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}