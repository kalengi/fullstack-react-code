import React from 'react';
import Counter from './CountdownClock';

const Wrapper = props => (
  <div key="wrapper">
    <Counter initialValue={Date.now()} />
  </div>
);

export default Wrapper;
