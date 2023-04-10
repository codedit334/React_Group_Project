import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../Assets/logo.png';
import '../styles/navbar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo-name">
          <img src={logo} alt="space logo" />
          <h1>Space Travelers&#39; Hub</h1>
        </div>
        <ul>
          <li><NavLink to="/">Rockets</NavLink></li>
          <li><NavLink>Dragons</NavLink></li>
          <li><NavLink>Mission</NavLink></li>
          <li><NavLink to="my_profile">My Profile</NavLink></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
