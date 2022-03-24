import { Component } from 'react';

import './MainText.scss';

class MainText extends Component {
  render() {
    return (
      <div className='container__text'>
        <h1 className='container__title'>Looking For A Great Film To Watch This Evening At Home?</h1>
        <p className='container__description'>
          For all those movie therapy lovers, we have gathered the best of the best in every genre,
          so that you could enjoy the iconic films once more or maybe even for the very first
          time.Here we go!
        </p>
      </div>
    );
  }
}

export default MainText;
