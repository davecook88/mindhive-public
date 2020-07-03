import React, { useState } from "react";

const MenuItem = ({ clickHandler, text, color, closed }) => {
  const createBorderClass = (color) => {
    return `${color}-left-border`;
  };
  return (
    <div
      onClick={() => clickHandler(text.toLowerCase().split(' ').join('_'))}
      className={`nav-menu-item text-center ${
        closed ? "min" : ""
      } pointer ${createBorderClass(color)}`}
    >
      <div className={`nav-menu-item-text ${
        closed ? "min" : ""
      }`}>{text}</div>
    </div>
  );
};

const MinimizeButton = ({ minimize, closed }) => (
  <div
    onClick={() => {
      minimize(!closed);
    }}
    className="minimize-button pointer"
  >
    <span className="align-self-center">{closed ? ">" : "<"} </span>
  </div>
);
export default function SideNav({currentUser, changePage, minimize, minimized}) {

  return (
    <div
      className={`side-nav
      light-grey-text 
      ${minimized ? "min" : "full"}-width dark-grey shadow fixed`}
    >
      <div className={`upper-background ${minimized ? "min" : ""}`}>
        <MinimizeButton minimize={minimize} closed={minimized} />
        <div className={`profile-pic shadow-center ${minimized ? "min" : ""}`}>
          <img alt="mindhive profilepic" src={currentUser.profile_pic || 'https://i.imgur.com/a3Oewwr.jpg'} />
        </div>
      </div>
      <div className={`nav-info-box ${minimized ? "min" : ""} `}>
        <div className="row no-margin">
          <div className="col s12">
            <div className="info-text key-info text-center">
              <span className="info-text name">{currentUser.name}</span>
              <span className=" info-text email">{currentUser.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col s4">
              <p className="info-text">to do</p>
            </div>
            <div className="col s8">
              <p className="info-text todo-items up-to-date">all up to date!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-items">
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="profile"
          color="purple"
        />
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="dashboard"
          color="blue"
        />
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="meals"
          color="yellow"
        />
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="checklist"
          color="orange"
        />
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="workouts"
          color="red"
        />
        <MenuItem
          clickHandler={changePage}
          closed={minimized}
          text="videos"
          color="dark-red"
        />
      </div>
    </div>
  );
}
