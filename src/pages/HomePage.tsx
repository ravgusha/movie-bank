import { ChangeEvent, useState, FormEvent, useEffect } from 'react';

import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList, { ApiCard } from '../components/CardList/CardList';
import CardInfo from '../components/CardInfo/CardInfo';
import Spinner from '../components/Spinner/Spinner';
import apiKey from '../constants';

const HomePage = () => {
  const [movies, setMovies] = useState<ApiCard[]>([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('inputValue') || '');
  const [currentMovie, setCurrentMovie] = useState(null);
  const [fetchInProgress, setFetchInProgress] = useState(false);

  const componentCleanup = () => {
    localStorage.setItem('inputValue', searchTerm);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', componentCleanup);
    setSearchTerm(localStorage.getItem('inputValue') || '');
  }, []);

  useEffect(() => {
    return () => {
      componentCleanup();
      window.removeEventListener('beforeunload', componentCleanup);
    };
  }, [searchTerm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchInProgress(true);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
      .then((data) => data.json())
      .then((data) => {
        setMovies([...data.results]);
        setFetchInProgress(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const viewCardInfo = (id: number) => {
    let filteredMovie = null;
    movies.forEach((movie) => {
      if (movie['id'] == id) {
        filteredMovie = movie;
      }
    });
    setCurrentMovie(filteredMovie);
  };

  const closeCardInfo = () => {
    setCurrentMovie(null);
  };

  return (
    <div>
      {currentMovie === null ? null : (
        <CardInfo closeCardInfo={closeCardInfo} currentMovie={currentMovie} />
      )}
      <MainText />
      <SearchForm value={searchTerm} handleSubmit={handleSubmit} handleChange={handleChange} />
      {fetchInProgress ? <Spinner /> : <CardList movies={movies} viewCardInfo={viewCardInfo} />}
    </div>
  );
};

export { HomePage };
