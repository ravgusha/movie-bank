import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CardAddPage } from './pages/CardAddPage';
import apiKey from './constants';

import './App.scss';
import { createContext, useState } from 'react';
import { ApiCard } from './components/CardList/CardList';
import CardInfo from './components/CardInfo/CardInfo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

interface IGlobalContext {
  movies: Array<ApiCard> | [];
  setMovies: (movies: Array<ApiCard>) => void;
  currentMovie: ApiCard | null;
  setCurrentMovie: (movie: ApiCard | null) => void;
  cards: Array<ApiCard> | [];
  setCards: (cards: Array<ApiCard>) => void;
}

const contextDefaultValue = {
  movies: [],
  setMovies: () => {},
  currentMovie: null,
  setCurrentMovie: () => {},
  cards: [],
  setCards: () => {},
};

export const GlobalContext = createContext<IGlobalContext>(contextDefaultValue);

const App = () => {
  const store = createStore(reducer);

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

  type movieOptions = ApiCard | null;
  type moviesOptions = Array<ApiCard> | [];

  const [currentMovie, setCurrentMovie] = useState<movieOptions>();
  const [movies, setMovies] = useState<moviesOptions>([]);
  const [cards, setCards] = useState<ApiCard[]>([]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
