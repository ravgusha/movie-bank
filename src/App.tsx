import { Routes, Route } from 'react-router-dom';
import { Component } from 'react';

import Header from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/Aboutpage';
import { CardAddPage } from './pages/CardAddPage';

import './App.scss';

export let genresList: Array<IGenre>;
export interface IGenre {
  id: number;
  name: string;
}

class App extends Component {
  apiKey = 'ec79681972e0c0a082743a6481ea4b2c';

  getGenresList = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        genresList = data.genres;
      });
  };

  render() {
    this.getGenresList();
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
}

export default App;
