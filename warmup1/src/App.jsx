import axios from 'axios';
import FetchOnce from './FetchOnce';
import ArticleList from './ArticleList';
import SafeFetch from './SafeFetch';

import { Routes, Route } from 'react-router-dom';
import ArticleDetail from './ArticleDetail';
import EditArticle from './EditArticle';
import ArticleListWithDelete from './ArticleListWithDelete';


function App() {


  // Test Ex01 (This JavaScript comment is correct because it is outside the return)
  console.log('Axios version:', axios.VERSION);
  console.log('Default baseURL:', axios.defaults.baseURL);

  return(
    <div className='App-container'>
      {/* Ex01: This is the correct way to comment inside HTML return */}
      <h3>Ex01</h3>
      <h1>Axios is Ready</h1>
      
      <div className='Fetch-Once'>
        {/* Ex02 */}
        <h3>Ex02</h3>
        <h1>Do you see anything eventually accept NULL?</h1>
        <FetchOnce/>
      </div>
      
      <div className='ArticlesList'>
        {/* Ex03 */}
        <h3>Ex03</h3>
        <h1>Article List here all gentlemen.</h1>
        <ArticleList/>
      </div>

      <div className='Loading-and-Error'>
        <h3>Ex04</h3>
        <h1>check out: ON && OFF</h1>
        <SafeFetch/>.
      </div>

      <div className='add-article'>
        <h3>Ex05</h3>
        <h1>POST data from a  form</h1>
        <SafeFetch/>.
      </div>
      
      {/* Ex06 Moved Routes here properly wrapped */}
      <div className='Route-container'>
        <h3>Ex06 Dynamic Routes with useParams </h3>
        <Routes>
          <Route path='/articles/:id' element={<ArticleDetail />} />
        </Routes>
      </div>

      <div className='edit-request'>
        <h3>Ex07 Put Req to Update an Item. </h3>
        <Routes>
          <Route path="/articles/:id/edit" element={<EditArticle />} />
        </Routes>
      </div>

      {/**Ex08 delete article */}
      <div className='Article-with-delete'>
        <h3>Ex08: Article with delete</h3>
        <Routes>
          <Route path="/articles" element={<ArticleListWithDelete />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
