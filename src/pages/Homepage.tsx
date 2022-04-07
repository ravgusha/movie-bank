import MainText from '../components/MainText/MainText';
import SearchForm from '../components/SearchForm/SearchForm';
import CardList from '../components/CardList/CardList';
import { ChangeEvent, Component } from 'react';
import { Card } from '../components/CardItem/CardItem';
interface MyState {
  movies: Card[];
  searchTerm: string;
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
      searchTerm: '',
    };
    this.apiKey = 'ec79681972e0c0a082743a6481ea4b2c';
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: [...data.results] });
        console.log(this.state);
      });
  };

  handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div>
        <MainText />
        <SearchForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <CardList movies={this.state.movies} />
      </div>
    );
  }
}

export { HomePage };
