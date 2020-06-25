import React, { Component } from 'react';
import Forms from './Forms';
import NutritionalInformationForm from './NutritionalInformation';

const InputPage = ({ selectedForm, currentUser, mealSheet }) => {
  return (
    <div className="dark-grey">
      {selectedForm ? (
        selectedForm === 'meals' ? (
          <NutritionalInformationForm
            mealSheet={mealSheet}
            user={currentUser}
          />
        ) : (
          <div className="container margin-top">
            <Forms formName={selectedForm} email={currentUser.email} />
          </div>
        )
      ) : null}
    </div>
  );
};

export default InputPage;
