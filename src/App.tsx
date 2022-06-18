import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CardAddPage } from './pages/CardAddPage';
import apiKey from './constants';

import './App.scss';
import CardInfo from './components/CardInfo/CardInfo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

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

  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add" element={<CardAddPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="movie/:currentMovie" element={<CardInfo />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
