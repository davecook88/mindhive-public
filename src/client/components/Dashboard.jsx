import React, { useState, useEffect } from 'react';
import server from '../server';
import Preloader from './Preloader';
import ApexLineGraph from './DashboardComponents/ApexLineGraph';
import ApexDonutChart from './DashboardComponents/ApexDonutChart';
import DropdownBox from './DashboardComponents/DropdownBox';
import UserMetrics from '../classes/UserMetrics';
import M from 'materialize-css';

const grey = '#252827';
const green = '#39ff94';
const lightGrey = '#d9d9d9';

const SectionToggleButton = ({ toggle, openSection, section }) => {
  const changeState = () => {
    if (openSection === section) {
      toggle(false);
    } else {
      toggle(section);
    }
  };
  return (
    <div onClick={changeState} className={`section-toggle`}>
      <span className="align-self-center section-toggle-button shadow-center pointer">
        {openSection !== section ? '<' : '>'}{' '}
      </span>
    </div>
  );
};

const Dashboard = ({
  currentUser,
  updateCurrentUser,
  amSheet,
  pmSheet,
  mealSheet,
  setAmSheet,
  setPmSheet,
  setMealSheet,
}) => {
  const alreadyLoaded = (amSheet && pmSheet && mealSheet);
  // const [amSheet, setAmSheet] = useState(null);
  // const [pmSheet, setPmSheet] = useState(null);
  // const [mealSheet, setMealSheet] = useState(null);
  const [ready, setReady] = useState(alreadyLoaded);
  const [sleepData, setSleepData] = useState();
  const [weightData, setWeightData] = useState();
  const [waterData, setWaterData] = useState();
  const [fastData, setFastData] = useState();
  const [dateRange, setDateRange] = useState(7);
  const [macros, setMacros] = useState(); //[Protein (g),	Fats (g),	Carbs (g)]

  const [openSection, setOpenSection] = useState(false);

  useEffect(() => {
    if (!ready) {
      if (!amSheet) {
        const getAmSheetData = server.getSheetsDataByUser(
          'am_data',
          currentUser.email
        );
        getAmSheetData
          .then(sheet => {
            console.log('gotChartData', JSON.stringify(sheet));
            if (sheet !== {}) {
              setAmSheet(sheet);
            }
          })
          .catch(err => M.toast({ html: 'Error getting am sheet' }));
      }
      if (!pmSheet) {
        const getPmSheetData = server.getSheetsDataByUser(
          'pm_data',
          currentUser.email
        );
        getPmSheetData
          .then(sheet => {
            console.log('gotChartData', JSON.stringify(sheet));
            if (sheet !== {}) {
              setPmSheet(sheet);
            }
          })
          .catch(err => M.toast({ html: 'Error getting pm sheet' }));
      }
      if (!mealSheet) {
        const getMealSheetData = server.getSheetsDataByUser(
          'meals',
          currentUser.email
        );

        getMealSheetData
          .then(sheet => {
            console.log('gotMealData', JSON.stringify(sheet));
            if (sheet !== {}) {
              setMealSheet(sheet);
            }
          })
          .catch(err => M.toast({ html: 'Error getting meal sheet' }));
      } else if (amSheet && pmSheet && mealSheet && !currentUser.metrics) {
        setUserMetrics();
      }
    }
  });

  const setUserMetrics = () => {
    console.log('setUserMetrics');
    try {
      const metrics = new UserMetrics(amSheet, pmSheet, mealSheet);
      currentUser.metrics = metrics.data;
      updateCurrentUser(currentUser);
      setReady(true);
      console.log(currentUser);
    } catch (err) {
      M.toast({ html: 'Error processing data' });
      console.log(err);
    }
  };

  const updateDateRange = val => {
    const n = parseInt(val);
    setDateRange(n);
    getSeriesForApex();
  };

  const getSeriesForApex = () => {
    console.log('getSeriesForApex');
    if (!currentUser.metrics) return null;
    const showSince = new Date();
    const today = new Date();
    showSince.setDate(today.getDate() - dateRange);

    const sleep = [];
    const water = [];
    const weight = [];
    const fast = [];
    let fatVal = 0;
    let carbVal = 0;
    let proteinVal = 0;
    let count = 0;
    let macrosCount = 0;

    for (let dateKey in currentUser.metrics) {
      const date = new Date(dateKey);
      if (date > showSince) {
        const record = currentUser.metrics[dateKey];
        if (record.sleep_time) {
          sleep.push([date.getTime(), record.sleep_time]);
        }
        if (record.fast_window) {
          fast.push([date.getTime(), record.fast_window]);
        }
        if (record.protein && record.carbs && record.fat) {
          fatVal += record.fat;
          proteinVal += record.protein;
          carbVal += record.carbs;
          macrosCount++;
        }
        if (record.water) {
          water.push([date.getTime(), record.water.reduce((a, b) => a + b, 0)]);
        }
        if (record.weight) {
          weight.push([
            date.getTime(),
            record.weight.reduce((a, b) => a + b, 0) / record.weight.length,
          ]);
        }
      }
    }
    setSleepData(...[sleep]);
    setWaterData(...[water]);
    setWeightData(...[weight]);
    setFastData(...[fast]);

    setMacros([proteinVal / count, fatVal / count, carbVal / count]);
    // console.log('out of getSeriesForApex');
  };

  if (ready) {
    console.log('ready');
    if (!weightData || !waterData || !fastData) getSeriesForApex();
    return (
      <div className="row">
        <div
          className={`col dashboard-section front  ${
            !openSection
              ? 'standard-width'
              : openSection === 'workouts'
              ? 'expanded-width'
              : 'minimized-width'
          }`}
        >
          <div className="mindhive-logo">
            <img alt="mindhive-logo" src="https://i.imgur.com/eeeIFMK.png" />
          </div>
          <div className="workout-section">
            {/* <h5 className="text-center">workout program</h5>
            <hr />
            <h6>bodyweight plan</h6>
            <table>
              <thead>
                <tr>
                  <th>exercise</th>
                  <th>rest</th>
                  <th>reps</th>
                  <th>sets</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>bench</td>
                  <td>1 min</td>
                  <td>8</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>pullups</td>
                  <td>30sec</td>
                  <td>12</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>pushups</td>
                  <td>30sec</td>
                  <td>12</td>
                  <td>4</td>
                </tr>
                <tr className="light-grey">
                  <td>cardio</td>
                  <td>bike</td>
                  <td>30mins</td>
                  <td></td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
        <div
          className={`col  shadow-center dashboard-section profile light-grey ${
            !openSection
              ? 'standard-width'
              : openSection === 'profile'
              ? 'expanded-width'
              : 'minimized-width'
          }`}
        >
          <div className="dashboard-profile-picture-holder ">
            <img
              alt="profile"
              className=" shadow-center"
              src={currentUser.profile_pic || 'https://i.imgur.com/a3Oewwr.jpg'}
            />
          </div>
          {!openSection ? (
            <div className="dashboard-profile-data ">
              <h3 className="text-center">{currentUser.name}</h3>
              <hr />
              <div className="row">
                <div className="col s8">
                  <div>age {currentUser.age}</div>
                  <div>max squat {currentUser.max_squat || 0}lbs</div>
                  <div>max bench {currentUser.max_bencg || 0}lbs</div>
                </div>
                <div className="col s4">
                  {currentUser.goals ? (
                    <div>
                      <h6>Goals</h6>
                      <ul class="list-unstyled">
                        <li>{currentUser.goals}</li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row text-center">
                <div className="col s6">
                  <h6>Before</h6>
                  <img
                    className="before-after-pic shadow-center"
                    alt="mindhive before"
                    src="https://previews.123rf.com/images/gelpi/gelpi1109/gelpi110900079/10564524-fat-man-with-pink-shirt-isolated-on-white-background.jpg"
                  />
                </div>
                <div className="col s6">
                  <h6>After</h6>
                  <img
                    className="before-after-pic shadow-center"
                    alt="mindhive before"
                    src="data:image/jpeg;base64,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"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div
          className={`col shadow-center dashboard-section dark-grey ${
            !openSection
              ? 'standard-width'
              : openSection === 'nutrition'
              ? 'expanded-width'
              : 'minimized-width'
          }`}
        >
          <SectionToggleButton
            toggle={setOpenSection}
            openSection={openSection}
            section="nutrition"
          />
          <div className="section-header white-text text-center">
            Show data for last{' '}
            <DropdownBox
              setSelection={updateDateRange}
              currentSelection={dateRange}
            />{' '}
            days.
          </div>
          {openSection && openSection !== 'nutrition' ? null : (
            <div>
              <div className="row no-margin">
                <div
                  className={`col ${
                    openSection === 'nutrition' ? 'half-width' : 's12'
                  }`}
                >
                  <ApexLineGraph
                    showLabels={openSection === 'nutrition'}
                    units="hours"
                    data={sleepData}
                    title="hours slept"
                    color="purple"
                  />
                </div>
                <div
                  className={`col ${
                    openSection === 'nutrition' ? 'half-width' : 's12'
                  }`}
                >
                  <ApexLineGraph
                    units="oz"
                    showLabels={openSection === 'nutrition'}
                    data={waterData}
                    title="water intake"
                    color="blue"
                  />
                </div>
              </div>
              <div className="row no-margin">
                <div
                  className={`col ${
                    openSection === 'nutrition' ? 'half-width' : 's12'
                  }`}
                >
                  <ApexLineGraph
                    units="lbs"
                    showLabels={openSection === 'nutrition'}
                    data={weightData}
                    title="weight"
                    color="orange"
                  />
                </div>
                <div
                  className={`col ${
                    openSection === 'nutrition' ? 'half-width' : 's12'
                  }`}
                >
                  <ApexLineGraph
                    units="hours"
                    showLabels={openSection === 'nutrition'}
                    data={weightData}
                    title="fast interval"
                    color="red"
                  />
                </div>
              </div>
              <div className="row no-margin">
                <div
                  className={`col ${
                    openSection === 'nutrition' ? 'half-width' : 's12'
                  }`}
                >
                  {openSection === 'nutrition' ? (
                    <ApexDonutChart
                      units="g"
                      showLabels={openSection === 'nutrition'}
                      data={macros}
                      title="macros"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default Dashboard;
