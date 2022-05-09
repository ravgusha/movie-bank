import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage, movies } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CardAddPage } from './pages/CardAddPage';
import { createdCards } from './components/CardAddForm/CardAddForm';
import apiKey from './constants';

import './App.scss';
import { createContext, useState } from 'react';
import { ApiCard } from './components/CardList/CardList';
import CardInfo from './components/CardInfo/CardInfo';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

interface IGlobalContext {
  movies?: Array<ApiCard>;
  createdCards?: Array<ApiCard>;
  currentMovie: ApiCard | null;
  setCurrentMovie: (movie: ApiCard | null) => void;
}

const contextDefaultValue = {
  movies: movies,
  createdCards: createdCards,
  currentMovie: null,
  setCurrentMovie: () => {},
};

export const GlobalContext = createContext<IGlobalContext>(contextDefaultValue);

const App = () => {
  const getGenresList = () => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    )
      .then((data) => data.json())
      .then((data) => {
        genresList = data.genres;
      });
  };

  getGenresList();

  type options = ApiCard | null;
  
  const [currentMovie, setCurrentMovie] = useState<options>();

  return (
    <GlobalContext.Provider
      value={{
        movies,
        createdCards,
        currentMovie: null,
        setCurrentMovie,
      }}
    >
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add" element={<CardAddPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="movie/:currentMovie" element={<CardInfo currentMovie={currentMovie} />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
};

export default App;
