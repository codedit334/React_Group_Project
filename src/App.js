import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import MyProfile from './components/MyProfile';
import Rockets from './components/rockets/Rockets';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Rockets />} />
      <Route path="/my_profile" element={<MyProfile />} />
    </Route>,
  ),
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
