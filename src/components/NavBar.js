import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../Assets/logo.png';
import '../styles/Navstyle.css';

export default function NavBar() {
  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo} alt="space-logo" />
          <h1>Space Travelers&#39; Hub</h1>
        </div>
        <ul>
          <NavLink to="/">Rockets</NavLink>
          <NavLink to="Dragons">Dragons</NavLink>
          <NavLink to="mission">Mission</NavLink>
          <hr />
          <NavLink to="my_profile">My Profile</NavLink>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
