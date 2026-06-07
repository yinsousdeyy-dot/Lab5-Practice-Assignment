import { useEffect, useState } from 'react';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const applyFilters = () => {
    if (!selectedJournalist) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => 
        article.journalistId === parseInt(selectedJournalist)
      );
      setFilteredArticles(filtered);
    }
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    setFilteredArticles(articles);
  };

  const getJournalistName = (id) => {
    const journalist = journalists.find(j => j.id === id);
    return journalist ? journalist.name : `Journalist #${id}`;
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

        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {filteredArticles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By {getJournalistName(article.journalistId)} | 
              Category #{article.categoryId}
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
