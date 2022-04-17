import { Component } from 'react';
import './Spinner.scss';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container" data-testid="spinner">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}

export default Spinner;
