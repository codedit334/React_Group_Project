import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getRockets } from './redux/rockets/rocketsSlice';
import { fetchMissions } from './redux/Missions/missionsSlice';
import { fetchDragons } from './redux/Dragons/dragonSlice';
import store from './redux/store';
import './styles/index.css';
import App from './App';

store.dispatch(getRockets());
store.dispatch(fetchMissions());
store.dispatch(fetchDragons());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
