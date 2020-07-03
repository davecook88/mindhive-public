import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard'

const ProgramsDisplay = ({programs, clickHandler}) => {
  console.log(programs)
  const createWorkoutCards = () => {
    const cards = Object.entries(programs).map((value, key) => (
      <WorkoutCard key={key} program={value[1]} clickHandler={clickHandler} />
    ));
    return cards;
  }

  return createWorkoutCards();
}

export default ProgramsDisplay;