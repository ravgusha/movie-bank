import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Notfoundpage } from './pages/Notfoundpage';
import { Homepage } from './pages/Homepage';
import { Aboutpage } from './pages/Aboutpage';

function App() {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/aboutfff">About</Link>
      </header>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<Aboutpage />} />
        <Route path='*' element={<Notfoundpage />} />
      </Routes>
    </div>
  );
}

export default App;
