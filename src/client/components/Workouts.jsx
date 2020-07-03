import React from 'react';
import DisplayWorkout from './WorkoutsComponents/DisplayWorkout';
import ProgramsDisplay from './WorkoutsComponents/ProgramsDisplay';
import server from '../server';
import Preloader from './Preloader';

const formatExerciseJson = sheet => {
  const { values, rowHeaders } = sheet;
  const json = {};
  values.slice(1).forEach(row => {
    const id = row[rowHeaders['exercise_id']];
    const name = row[rowHeaders['exercise_name']];
    const description = row[rowHeaders['description']];
    const videoUrl = row[rowHeaders['video_url']];
    const videoId = row[rowHeaders['video_id']];
    const exerciseObject = {
      id: id,
      name: name,
      description: description,
      videoUrl: videoUrl,
      videoId: videoId,
    };
    if (!json.hasOwnProperty(id)) {
      json[id] = exerciseObject;
    }
  });
  console.log(json);
  return json;
};

const formatWorkoutJson = sheet => {
  const { values, rowHeaders } = sheet;
  const json = {};
  values.slice(1).forEach(row => {
    const program = row[rowHeaders['workout_program']];
    const week = row[rowHeaders['week']];
    const day = row[rowHeaders['day']];
    const img = row[rowHeaders['program_image']];
    const description = row[rowHeaders['program_description']];
    const exerciseObj = {
      name: row[rowHeaders['exercise_name']],
      rest: row[rowHeaders['rest']],
      reps: row[rowHeaders['reps']],
      id: row[rowHeaders['exercise_id']],
    };

    if (!json.hasOwnProperty(program)) {
      json[program] = { name: program, img:img, weeks: {}, description: description, };
    }

    if (!json[program].weeks.hasOwnProperty(week)) {
      json[program].weeks[week] = {
        name: 'week ' + week,
        days: {},
      };
    }

    if (!json[program].weeks[week].days.hasOwnProperty(day)) {
      json[program].weeks[week].days[day] = {
        name: 'day ' + day,
        exercises: [exerciseObj],
      };
    } else {
      json[program].weeks[week].days[day].exercises.push(exerciseObj);
    }
  });
  return json;
};

class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      sheet: {},
      program: null,
      programs: null,
      exercise: null,
      exercises: null,
      programDetails: null,
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    M.AutoInit();
    const getWorkoutSheetsData = server.getSheetsData('workouts');
    const getExerciseSheetsData = server.getSheetsData('exercises');

    console.log(getExerciseSheetsData);
    getExerciseSheetsData
      .then(sheet => {
        if (sheet !== {}) {
          const exercises = formatExerciseJson(sheet);
          console.log(JSON.stringify(exercises));
          const ready = this.state.programs !== null;
          this.setState({ ready: ready, exercises: exercises });
        }
      })
      .catch(err => console.log(err));
    getWorkoutSheetsData
      .then(sheet => {
        if (sheet !== {}) {
          const programs = formatWorkoutJson(sheet);
          const ready = this.state.exercises !== null;
          console.log(JSON.stringify(programs));
          this.setState({ ready: ready, programs: programs });
        }
      })
      .catch(err => console.log(err));
  }

  handleSelectProgram = opt => {
    this.setState({ program: opt });
  };

  handleOption = (week, day) => {
    this.setState({
      displayOptions: {
        week: week,
        day: day,
      },
    });
  };

  getPrograms() {
    return Object.entries(this.state.programs).map(([k, v]) => {
      return v.name;
    });
  }

  setExercise = id => {
    console.log('setExercise', id);
    const exercise = this.state.exercises[id];
    if (exercise) {
      this.setState({ exercise: exercise });
    }
  };

  render() {
    const { program, programs, exercise } = this.state;
    const selectedProgram = programs ? programs[program] : null;
    const showPreloader = () => {
      console.log(this.state);
      return <Preloader />;
    }
    return (
      <div className="dark-grey">
        {!this.state.ready ? (
          
          showPreloader()
        ) : (
          <div>
            <div className="row">
              <div className="col s3 text-center">
                <div className="mindhive-logo small">
                  <img
                    alt="mindhive-logo"
                    src="https://i.imgur.com/eeeIFMK.png"
                  />
                </div>
              </div>
              <div className="col s9 text-right light-grey-text">
                <h1>{program || 'programs'}</h1>
              </div>
            </div>
            <div className="row">
              <div className="container-fluid">
                {program ? (
                  <div className="row">
                    <DisplayWorkout
                      weeks={selectedProgram.weeks}
                      setExercise={this.setExercise}
                      exercise={exercise}
                    />
                  </div>
                ) : null}
                <div className="row">
                  <ProgramsDisplay
                    programs={programs}
                    clickHandler={this.handleSelectProgram}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Workouts;
