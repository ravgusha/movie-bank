import { Component } from 'react';
import './Spinner.scss';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}

export default Spinner;
