
import React from "react"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import MyProfile from './components/MyProfile';
import Dragons from "./components/Dragons";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route path="/my_profile" element={<MyProfile />} />
      <Route path="/Dragons" element={<Dragons />} />
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
