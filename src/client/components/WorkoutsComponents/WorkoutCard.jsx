import React from 'react';

const WorkoutCard = ({ program, clickHandler }) => {
  console.log('WorkoutCard', program);
  return (
    <div className="col s12 m5">
      <div className="padded">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={program.img} />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {program.name}
              <i className="material-icons right">more_vert</i>
            </span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {program.name}
              <i className="material-icons right">close</i>
            </span>
            <p>{program.description}</p>
            <div className="btn" onClick={() => clickHandler(program.name)}>
              select program
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkoutCard;
