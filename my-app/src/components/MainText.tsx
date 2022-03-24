import { Component } from 'react';

import './MainText.scss';

class MainText extends Component {
  render() {
    return (
      <div className='container__text'>
        <h1 className='container__title'>Find Your Perfect Movie</h1>
        <p className='container__description'>For all those movie therapy lovers, we have gathered the best of the best in every genre.<br />Here we go!
        </p>
      </div>
    );
  }
}

export default MainText;
