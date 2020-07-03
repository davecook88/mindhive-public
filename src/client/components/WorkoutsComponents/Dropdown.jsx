import React, { useEffect } from "react";
import M from "materialize-css";

const Dropdown = ({ weeks, setWorkout }) => {
  useEffect(() => M.AutoInit());

  const buildSection = (week, key) => {
    console.log("buildSection", week);
    return Object.entries(week).map(([k, v]) => {
      return (
        <option value={JSON.stringify(v.exercises)} key={key + v.name}>
          {v.name}
        </option>
      );
    });
  };

  const buildContent = (weeks) => {
    console.log("buildContent", weeks);
    return Object.entries(weeks).map(([k, v]) => {
      if (v) {
        return (
          <optgroup label={v.name} key={k}>
            {buildSection(v.days, k)}
          </optgroup>
        );
      }
    });
  };

  const handleChange = (e) => {
    const workoutObj = JSON.parse(e.target.value);
    setWorkout(workoutObj);
  };

  return (
    <div className="input-field col s12">
      <select className="light-grey-text" onChange={(event) => handleChange(event)}>
        {buildContent(weeks)}
      </select>
      <label className="light-grey-text">Workouts</label>
    </div>
  );
};

export default Dropdown;
