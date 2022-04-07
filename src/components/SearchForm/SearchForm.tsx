import { Component } from 'react';
import './SearchForm.scss';
interface MyState {
  inputValue: string;
}

interface MyProps {
  handleChange:  ((e: ChangeEvent<HTMLFormElement>) => void);
  handleSubmit: ((e: React.FormEvent) => void);
}
class SearchForm extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <input
          data-testid="input"
          className="search-form__input"
          type="text"
          placeholder="Search for movie..."
          onChange={this.props.handleChange}
        />
        <button className="search-form__button">Search</button>
      </form>
    );
  }
}

export default SearchForm;
