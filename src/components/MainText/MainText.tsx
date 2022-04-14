import { Component } from 'react';
import './MainText.scss';
class MainText extends Component {
  render() {
    return (
      <div className='main-text'>
        <h1 className='main-text__title'>Find Your Perfect Movie</h1>
        <p className='main-text__description'>For all those movie therapy lovers, we have gathered the best of the best in every genre.<br />Here we go!
        </p>
      </div>
    );
  }
}

export default MainText;
