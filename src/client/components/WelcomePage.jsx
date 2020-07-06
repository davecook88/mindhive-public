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
        <div className="row">
          <div className="col">
            <img alt="mindhive-text-white" className="half-width" src={'https://i.imgur.com/0QiIzPU.png'} />
          </div>
        </div>
        <div className="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12 m6">
                <input
                  placeholder="Enter your email address to begin"
                  id="first_name"
                  type="email"
                  class="validate white-text"
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="btn" onClick={clickHandler}>
                  Enter
                </button>
                {<div>{errors}</div>}
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col">
            <a className="light-grey-text" href="https://docs.google.com/forms/d/e/1FAIpQLSdCi045uQG2DkyJQHLe35aLPbakmnfpB_yg66r5Meu5gNNLoA/viewform">No account? Sign up here.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

WelcomePage.propTypes = {
  setCurrentUser: PropTypes.func,
};
