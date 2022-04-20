import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import NewsList from './components/NewsList';
import ShowNews from './components/ShowNews';

function App() {
  return (
    <div className='App'>
      <Router>
        <Link to='/' className='link'>
          <h2 className='appTitle'>XYZ News</h2>
        </Link>
        <Routes>
          <Route path='/news/:id' element={<ShowNews />} />
          <Route path='/' element={<NewsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
