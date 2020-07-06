import React from 'react';

const SectionHeader = ({ title }) => (
  <div className="row">
    <div className="col s3 text-center">
      <div className="mindhive-logo small">
        <img alt="mindhive-logo" src="https://i.imgur.com/eeeIFMK.png" />
      </div>
    </div>
    <div className="col s9 text-right light-grey-text">
      <h1>{title}</h1>
    </div>
  </div>
);

export default SectionHeader;