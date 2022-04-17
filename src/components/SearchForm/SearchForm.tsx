import { Component } from 'react';
import './SearchForm.scss';
interface MyProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
}
class SearchForm extends Component<MyProps> {
  constructor(props: MyProps) {
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
          value={this.props.value}
        />
        <button className="search-form__button">Search</button>
      </form>
    );
  }
}

export default SearchForm;
