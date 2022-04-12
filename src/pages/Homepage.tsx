import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList, { ApiCard } from '../components/CardList/CardList';
import { ChangeEvent, Component, FormEvent } from 'react';
import CardInfo from '../components/CardInfo/CardInfo';

interface MyState {
  movies: ApiCard[];
  searchTerm: string;
  currentMovie: ApiCard | null;
}

interface MyProps {
  apiKey?: string;
}

export interface IGenre{
  id: number;
  name: string;
}

export let genresList: Array<IGenre>;

class HomePage extends Component<MyProps, MyState> {
  apiKey: string;

  constructor(props: MyProps) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: '',
      currentMovie: null,
    };
    this.apiKey = 'ec79681972e0c0a082743a6481ea4b2c';
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: [...data.results] });
      });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  };

  viewCardInfo = (id: number) => {
    let filteredMovie = null;
    this.state.movies.forEach((movie) => {
      if (movie.id == id) {
        filteredMovie = movie;
      }
    });
    this.setState({ currentMovie: filteredMovie });
  };

  closeCardInfo = () => {
    this.setState({ currentMovie: null });
  };

  getGenresList = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        genresList = data.genres;
        console.log(genresList);
      });
  };

  render() {
    this.getGenresList();

    return (
      <div>
        {this.state.currentMovie === null ? null : (
          <CardInfo closeCardInfo={this.closeCardInfo} currentMovie={this.state.currentMovie} />
        )}
        <MainText />
        <SearchForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <CardList movies={this.state.movies} viewCardInfo={this.viewCardInfo} />
      </div>
    );
  }
}

export { HomePage };
