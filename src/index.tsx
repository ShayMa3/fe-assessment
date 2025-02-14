import App from './components/App/App';
import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store/store';
import './index.css';
import { Provider } from 'react-redux';

const store = configureStore();

const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

render(<Root />, document.getElementById('root'));
