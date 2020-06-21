import React, { useState } from 'react';

const Navbar = (props) => {

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper grey">
          <a href="#!" className="brand-logo">Mindhive</a>
          <ul className="right pointer">
            <li onClick={() => props.changePage('dashboard')}>Dashboard</li>
            <li onClick={() => props.changePage('inputs')}>Inputs</li>
          </ul>
        </div>
      </nav>
    </div>
  );

}
export default Navbar;