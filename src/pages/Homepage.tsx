import { ChangeEvent, Component, FormEvent } from 'react';
import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList, { ApiCard } from '../components/CardList/CardList';
import CardInfo from '../components/CardInfo/CardInfo';
import Spinner from '../components/Spinner/Spinner'

interface MyState {
  movies: ApiCard[];
  searchTerm: string;
  currentMovie: ApiCard | null;
  fetchInProgress: boolean;
}

interface MyProps {
  apiKey?: string;
}

class HomePage extends Component<MyProps, MyState> {
  apiKey: string;

  constructor(props: MyProps) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: localStorage.getItem('inputValue') || '',
      currentMovie: null,
      fetchInProgress: false,
    };
    this.componentCleanup = this.componentCleanup.bind(this);
    this.apiKey = 'ec79681972e0c0a082743a6481ea4b2c';
  }

  componentCleanup() {
    localStorage.setItem('inputValue', this.state.searchTerm);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    this.setState({
      searchTerm: localStorage.getItem('inputValue') || '',
    });
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({fetchInProgress: true });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ movies: [...data.results], fetchInProgress: false });
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

  render() {
    return (
      <div>
        {this.state.currentMovie === null ? null : (
          <CardInfo closeCardInfo={this.closeCardInfo} currentMovie={this.state.currentMovie} />
        )}
        <MainText />
        <SearchForm value={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {this.state.fetchInProgress ? (<Spinner />) : (<CardList movies={this.state.movies} viewCardInfo={this.viewCardInfo} />)}
      </div>
    );
  }
}

export { HomePage };
