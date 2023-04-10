import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <nav>
        <div>
          <h1>Space Travelers&#39; Hub</h1>
        </div>
        <ul>
          <NavLink>Rockets</NavLink>
          <NavLink>Dragons</NavLink>
          <NavLink to="mission">Mission</NavLink>
          <NavLink to="my_profile">My Profile</NavLink>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
