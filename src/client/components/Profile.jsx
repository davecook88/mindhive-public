import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import server from '../server';
import M from 'materialize-css';

const UserDataInput = ({user, attr, label, updateUser}) => {
  return (
    <div class="input-field col s6">
      <div className="sub-text">{label}</div>
      <input value={user[attr]} id="max_bench" type="text" class="validate" onChange={(e) => {updateUser(attr, e.target.value )}} />
    </div>
  )
}



const Profile = ({ currentUser, updateCurrentUser }) => {
  const createPersonalBestInputs = () => {
    const attrMap = {
      max_bench:'Bench (lbs)',
      max_squat:'Squat (lbs)', 
      max_deadlift:'Deadlift (lbs)', 
      max_pushup:'Pushups',
      max_dips:'Dips',
    }

    return Object.entries(attrMap).map(([attr, label]) => (
      <UserDataInput 
        user={currentUser}
        attr={attr}
        label={label}
        updateUser={updateUser}
        />
    ));
  }

  

  const updateUser = (attr, value) => {
    const userCopy = {...currentUser};
    userCopy[attr] = value;
    updateCurrentUser(userCopy);
  }
  
  const updateUserSheet = () => {
    const update = server.updateUserSheet(currentUser)
    update.then((res) => {
      M.toast({html: res})

    })
    .catch((err) => {
      M.toast({html: err});

    })
    
  }



  return (
    <div class="white">
      <SectionHeader title="profile" />
      <div className="container">
        <div className="row">
          <div className="dashboard-profile-picture-holder col s12 text-center">
            <img
              alt="profile"
              className=" shadow-center"
              src={currentUser.profile_pic || 'https://i.imgur.com/a3Oewwr.jpg'}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 text-center">
            <h3>
              {currentUser.name} ({currentUser.age})
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m8 text-center">
            <h6>personal bests</h6>
            {createPersonalBestInputs()}
          </div>
          <div className="col s12 m4 text-center">
            <h6>goals</h6>
            <p>{currentUser.goals}</p>
          </div>
        </div>
        <div className="row text-center">
          <div className="btn" onClick={updateUserSheet}>Update profile</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;