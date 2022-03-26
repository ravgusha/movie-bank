import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import MainText from './components/MainText';
import SearchForm from './components/SearchForm';
import CardList from './components/CardList';
import { Notfoundpage } from './pages/Notfoundpage';
import { Homepage } from './pages/Homepage';
import { Aboutpage } from './pages/Aboutpage';

function App() {
  return (
    <div className="container">
      <Header></Header>
      <MainText></MainText>
      <SearchForm></SearchForm>
      <CardList></CardList>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </div>
  );
}

export default App;
