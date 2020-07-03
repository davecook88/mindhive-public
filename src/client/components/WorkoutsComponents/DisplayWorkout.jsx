import React, { useState } from "react";
import Dropdown from "./Dropdown";
import YoutubeIframe from '../YoutubeIframe';

const WorkoutRow = ({ id, name, rest, reps, setExercise }) => {
  return (
    <tr
      key={id}
      className="table-cell green-bottom-border pointer"
      onClick={() => setExercise(id)}
    >
      <td>{name}</td>
      <td>{rest}</td>
      <td>{reps}</td>
    </tr>
  );
};

const DisplayWorkout = ({ weeks, exercise, setExercise }) => {
  const defaultWorkout = weeks[1].days[1].exercises;
  const [workout, setWorkout] = useState(defaultWorkout);

  const buildBody = (exercises) => {
    console.log("buildBody", exercises);
    return exercises.map((value, index) => {
      const { name, rest, reps, id } = value;
      return (
        <WorkoutRow
          id={id}
          name={name}
          rest={rest}
          reps={reps}
          setExercise={setExercise}
        />
      );
    });
  };

  const showExercise = (exercise) => {
    return (
      <div className="exercise-info light-grey-text">
        <h4 className="no-margin">{exercise.name}</h4>
        <p>{exercise.description}</p>
        <YoutubeIframe id={exercise.videoId} title={exercise.id} />
      </div>
    );
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col s12 m6">
          <Dropdown weeks={weeks} setWorkout={setWorkout} />
        </div>
        <div className="col s12 m6"></div>
      </div>

      {workout ? (
        <div className="row">
          <div className="col s12 m6">
            <table className="light-grey-text">
              <thead>
                <tr className=" green-bottom-border ">
                  <th>Exercise</th>
                  <th>Rest Time</th>
                  <th>Target Reps</th>
                </tr>
              </thead>

              <tbody>{buildBody(workout)}</tbody>
            </table>
          </div>
          <div className="col s12 m6">
            {exercise ? showExercise(exercise) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayWorkout;
