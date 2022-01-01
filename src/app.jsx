import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app.js';

function render() {
  ReactDOM.render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>, document.body);
}
render();