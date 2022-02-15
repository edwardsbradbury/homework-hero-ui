import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/404NotFound';

function App() {
  return (
    <div className="App">
      <a href='/'>
        <img src={require('./assets/logo.png')}></img>
      </a>
      <Router>
        <nav>
          <Link to='/'></Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/login'>Login</Route>
          <Route path='/register'>Register</Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
