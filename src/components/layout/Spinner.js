import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='Loading...' style={imageStyle}></img>
    </Fragment>
  );
};

const imageStyle = {
  display: 'block',
  width: '200px',
  margin: 'auto',
  backgroundColor: 'transparent',
};

export default Spinner;
