import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';

import { createRoot } from 'react-dom/client'; // Make sure createRoot is also imported,
// why is createRoot needed to be imported?
createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
