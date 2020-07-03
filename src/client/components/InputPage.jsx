import React, { Component, useState } from 'react';
import Forms from './Forms';

const InputPage = ({ selectedForm, currentUser }) => {
  const currentUserEmail = currentUser.email;
  const [ampmForm, setAmpm] = useState(selectedForm)

  const setForm = (e) => {
    const time = e.target.innerText.toLowerCase();
    setAmpm(time + '_checklist')
  }
  return (
    <div className="dark-grey row">
      <div className="col">
        <Forms formName={ampmForm} email={currentUserEmail} />
      </div>
      <div className="col">
        <ul>
          <li onClick={e => setForm(e)} className="nav-menu-item text-center pointer light-grey-text ampm-select">AM</li>
          <li onClick={e => setForm(e)} className="nav-menu-item text-center pointer light-grey-text ampm-select">PM</li>
        </ul>
      </div>
    </div>
  );
};

export default InputPage;
