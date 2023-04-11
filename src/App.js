import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import MyProfile from './components/MyProfile';
import Rockets from './components/rockets/Rockets';
import Dragons from './components/Dragons/Dragons';
import Mission from './components/Mission';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Rockets />} />
      <Route path="/my_profile" element={<MyProfile />} />
      <Route path="/Dragons" element={<Dragons />} />
      <Route path="/mission" element={<Mission />} />
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
