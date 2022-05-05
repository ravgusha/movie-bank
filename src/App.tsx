import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage, movies } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CardAddPage } from './pages/CardAddPage';
import apiKey from './constants';

import './App.scss';
import { createContext } from 'react';
import { ApiCard } from './components/CardList/CardList';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

interface IGlobalContext {
  movies: Array<ApiCard>;
}

export const GlobalContext = createContext<IGlobalContext>();

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
      <GlobalContext.Provider value={{ movies: movies }}>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="add" element={<CardAddPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      </GlobalContext.Provider>
    );
}

export default App;
