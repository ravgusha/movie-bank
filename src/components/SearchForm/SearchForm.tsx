import { Component } from 'react';
import './SearchForm.scss';
interface MyState {
  inputValue: string;
}
class SearchForm extends Component<object, MyState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
    };
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentCleanup() {
    localStorage.setItem('inputValue', this.state.inputValue);
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    this.setState({ inputValue });
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    this.setState({
      inputValue: localStorage.getItem('inputValue') || '',
    });
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  render() {
    return (
      <form className="search-form">
        <input
          data-testid="input"
          className="search-form__input"
          type="text"
          placeholder="Search for movie..."
          value={this.state.inputValue}
          onChange={this.onChange}
        />
        <button className="search-form__button">Search</button>
      </form>
    );
  }
}

export default SearchForm;
