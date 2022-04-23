import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CardAddPage } from './pages/CardAddPage';
import apiKey from './constants';

import './App.scss';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

const App = () => {
  const getGenresList = () => {
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        genresList = data.genres;
      });
  };

  getGenresList();
    return (
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="add" element={<CardAddPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
}

export default App;
