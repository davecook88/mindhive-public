import React, { useState } from 'react';

const Navbar = ({ selectPage, page }) => {
  
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper dark-grey text-center">
          <div data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </div>
          <img className="logo-image" src="https://i.imgur.com/XX2azL5.png" />
          <ul class="right hide-on-med-and-down light-grey-text">
            <li
              className="pointer side-padding highlight-on-hover"
              onClick={event => selectPage(event.target.innerText)}
            >
              Dashboard
            </li>
            <li
              className="pointer side-padding highlight-on-hover"
              onClick={event => selectPage(event.target.innerText)}
            >
              Forms
            </li>
            <li
              className="pointer side-padding highlight-on-hover"
              onClick={event => selectPage(event.target.innerText)}
            >
              Workouts
            </li>
            <li
              className="pointer side-padding highlight-on-hover"
              onClick={event => selectPage(event.target.innerText)}
            >
              Videos
            </li>
          </ul>
        </div>
        
      </nav>
      <ul class="sidenav" id="mobile-demo">
        <li
          className="pointer"
          onClick={event => selectPage(event.target.innerText)}
        >
          Dashboard
        </li>
        <li
          className="pointer"
          onClick={event => selectPage(event.target.innerText)}
        >
          Forms
        </li>
        <li
          className="pointer"
          onClick={event => selectPage(event.target.innerText)}
        >
          Workouts
        </li>
        <li
          className="pointer"
          onClick={event => selectPage(event.target.innerText)}
        >
          Videos
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
