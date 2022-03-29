import { Routes, Route} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { NotFoundPage } from './pages/Notfoundpage';
import { HomePage } from './pages/Homepage';
import { AboutPage } from './pages/Aboutpage';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
