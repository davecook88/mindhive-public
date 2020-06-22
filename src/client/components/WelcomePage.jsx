import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WelcomePage = ({setCurrentUser}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(['error']);
  
  const displayErrors = () => errors.forEach(error => <span class="danger">{error}</span>)
  return (
    <div className="container">
      <div class="row">
        <form class="col s12" onSubmit={() => setCurrentUser()}>
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="Enter your email address to begin" id="first_name" type="email" class="validate" onChange={setEmail(this.value)} />
              <input type="submit" className="btn">Enter</input>
              { displayErrors() }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WelcomePage;

WelcomePage.propTypes = {
  setCurrentUser: PropTypes.func,
};
