import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleFilter from './components/ArticleFilter';
import ArticleFilterByCategory from './components/ArticleFilterByCategory';
import ArticleFilterByJournalist from './components/ArticleFilterByJournalist';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>📰 News Article Filter</h1>
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Link to="/">All Filters</Link>
          <Link to="/filter-by-category">Filter by Category</Link>
          <Link to="/filter-by-journalist">Filter by Journalist</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ArticleFilter />} />
          <Route path="/filter-by-category" element={<ArticleFilterByCategory />} />
          <Route path="/filter-by-journalist" element={<ArticleFilterByJournalist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;