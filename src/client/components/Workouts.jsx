import React from 'react';
import Dropdown from './WorkoutsComponents/Dropdown';
import DisplayWorkout from './WorkoutsComponents/DisplayWorkout';
import ProgramDropdown from './WorkoutsComponents/ProgramDropdown';
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
      videoId: videoId
    }
    if (!json.hasOwnProperty(id)) {
      json[id] = exerciseObject;
    }
  });
  console.log(json);
  return json;
}

const formatWorkoutJson = sheet => {
  const { values, rowHeaders } = sheet;
  const json = {};
  values.slice(1).forEach(row => {
    const program = row[rowHeaders['workout_program']];
    const week = row[rowHeaders['week']];
    const day = row[rowHeaders['day']];
    const exercise_name = row[rowHeaders['exercise_name']];
    const rest = row[rowHeaders['rest']];
    const reps = row[rowHeaders['reps']];
    const id = row[rowHeaders['exercise_id']];
    const exerciseObj = {
      name: exercise_name,
      rest: rest,
      reps: reps,
      id: id,
    };
    
    if (!json.hasOwnProperty(program)) {
      json[program] = { name: program, weeks: {} };
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

      displayOptions: {
        week: 'week-1',
        day: 0,
      },

      programs: {
        Program1: {
          name: 'Program 1',
          works: {
            week1: {
              name: 'Week 1',
              days: ['Day 1', 'Day 2'],
            },
            week2: {
              name: 'Week 2',
              days: ['Day 1', 'Day 2'],
            },
          },
        },
      },
    };
  }

  componentDidMount() {
    M.AutoInit();
    const getWorkoutSheetsData = server.getSheetsData('workouts');
    const getExerciseSheetsData = server.getSheetsData('exercises');
    
    console.log(getExerciseSheetsData);
    getExerciseSheetsData
      .then(sheet => {
        if (sheet !== {}) {
          const exercises = formatExerciseJson(sheet);
          console.log(JSON.stringify(exercises));
          this.setState({ ready: true, exercises: exercises });
        }
      })
      .catch(err => console.log(err));
    getWorkoutSheetsData
      .then(sheet => {
        if (sheet !== {}) {
          const programs = formatWorkoutJson(sheet);
          this.setState({ ready: true, programs: programs });
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

  render() {
    const { ready, program, programs, displayOptions } = this.state;
    console.log(ready);
    if (!ready) {
      return <Preloader />;
    } else {
      return (
        <div className="content-page">
          <div className="row">
            <div className="col s12">
              <h1>Workouts</h1>
              <hr />

              <div className="container-flud">
                <div className="row">
                  <div className="col s6">
                    <ProgramDropdown
                      handleOption={this.handleSelectProgram}
                      data={this.getPrograms()}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s6">
                    <Dropdown
                      handleOption={this.handleOption}
                      data={programs[program].works}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s12">
                    <DisplayWorkout
                      program={program}
                      week={displayOptions.week}
                      day={
                        displayOptions.day
                      } /** Here we should pass the elements needed in the dropdown. */
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s12">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Work on This
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Workouts;
