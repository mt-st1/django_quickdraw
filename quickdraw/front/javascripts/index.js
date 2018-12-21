import React from 'react';
import ReactDOM from 'react-dom';
import HelloMessage from './sub';

const App = () => (
  <div>
    <h1>Hello React!</h1>
    <HelloMessage
      message='with Babel & Webpack'
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('react-root'));