import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WelcomePage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const clickHandler = e => {
    e.preventDefault();
    const result = setCurrentUser(email);
    if (result !== 'success') {
      setErrors(result);
    }
  };

  return (
    <div className="full-page absolute dark-grey flex-center-wrapper">
      <div className="container">
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input
                  placeholder="Enter your email address to begin"
                  id="first_name"
                  type="email"
                  class="validate"
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="btn" onClick={clickHandler}>
                  Enter
                </button>
                {<div>{errors.toString()}</div>}
                {<div>{email}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

WelcomePage.propTypes = {
  setCurrentUser: PropTypes.func,
};
