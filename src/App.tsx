import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header/Header';
import { Home } from './containers/Home';
import { NotFound } from './containers/NotFound';
import { CardAdd } from './containers/CardAdd';
import { About } from './containers/About';
import CardInfo from './components/CardInfo/CardInfo';
import apiKey from './constants';
import store from './redux/configureStore';

import './App.scss';

export let genresList: Array<IGenre>;

export interface IGenre {
  id: number;
  name: string;
}

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

  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<CardAdd />} />
          <Route path="*" element={<NotFound />} />
          <Route path="movie/:currentMovie" element={<CardInfo />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
