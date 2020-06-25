import React, { useState, useEffect } from 'react';
import server from '../server';
import Preloader from './Preloader';
import LineGraph from './DashboardComponents/LineGraph';

const grey = '#252827';
const green = '#39ff94';
const lightGrey = '#d9d9d9';

const getSheetsData = server.getSheetsData('macrochart');
const Dashboard = ({ user }) => {
  const [sheet, setSheet] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sheet !== {}) {
      getSheetsData
        .then(sheet => {
          console.log('gotChartData', sheet);

          if (sheet !== {}) {
            setSheet(sheet);
            setReady(true);
          }
        })
        .catch(err => console.log(err));
    }
  });

  const waterChart = () => {
    if (!sheet || sheet === {}) return null;
    console.log('getWaterData', sheet);
    const { values, rowHeaders } = sheet;
    const rh = rowHeaders;
    const data = values.map(row => [
      new Date(row[rh['Date']]),
      row[rh['Water (oz)']],
    ]);
    const options = {
      title: 'Water intake',
      hAxis: { title: 'Date' },
      vAxis: { title: 'Water (oz)' },
      legend: 'none',
      backgroundColor: grey,
      chartArea: {
        backgroundColor: grey,
      },
      colors: [green],
    };
    console.log(data);
    return <LineGraph data={data} options={options} />;
  };
  const fastingChart = () => {
    if (!sheet || sheet === {}) return null;
    console.log('getWaterData', sheet);
    const { values, rowHeaders } = sheet;
    const rh = rowHeaders;
    const data = values.map(row => [
      new Date(row[rh['Date']]),
      row[rh['Fast window (hrs)']],
    ]);
    const options = {
      title: 'Fasting',
      hAxis: { title: 'Date' },
      vAxis: { title: 'Hours' },
      legend: 'none',
      backgroundColor: grey,
      chartArea: {
        backgroundColor: grey,
      },
      colors: ['red'],
    };
    console.log(data);
    return <LineGraph data={data} options={options} />;
  };
  const sleepChart = () => {
    if (!sheet || sheet === {}) return null;
    console.log('getSleepData', sheet);
    const { values, rowHeaders } = sheet;
    const rh = rowHeaders;
    const data = values.map(row => [
      new Date(row[rh['Date']]),
      row[rh['Sleep time (hrs)']],
    ]);
    const options = {
      title: 'Sleep',
      hAxis: { title: 'Date' },
      vAxis: { title: 'Hours' },
      legend: 'none',
      backgroundColor: grey,
      chartArea: {
        backgroundColor: grey,
      },
      colors: ['blue'],
    };
    console.log(data);
    return <LineGraph data={data} options={options} />;
  };

  if (ready) {
    return (
      <div className="container">
        <div className="row text-center light-grey-text">
          <div className="col">
            <h3 className="">DASHBOARD</h3>
            <span className="">{user.email}</span>
          </div>
        </div>
        <div className="row">
          <div className="col">{waterChart()}</div>
          <div className="col">{fastingChart()}</div>
        </div>
        <div className="row">
          <div className="col">{sleepChart()}</div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default Dashboard;
