import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Preloader from '../Preloader'

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}

export default function ApexLineGraph({ data, color, title, showLabels }) {
  data = data.sort(sortFunction);
  console.log('Apex chart ' + title, data);


  // const [window,setWindow] = UseState



  if (!data){
    return <Preloader />
  }

  const options = {

    chart: {
      type: 'area',
      colors: ['#77B6EA', '#ff0000'],
      foreColor: '#d9d9d9',
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      animations: {
        enabled: false,
      },
      toolbar: {
        show:false,
        autoSelected: 'zoom',
        tools: {
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: ['#ffffff', '#545454'],
      width: 2,
      dashArray: 0,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      colors: ['#77B6EA', '#545454'],
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      show:false,
      type: 'datetime',
      min: data[0][0],
      // tickAmount: 6,
    },
    yaxis: {
      show:true,
      labels: {
        formatter: val => val.toFixed(2),
        show:true
      },
      // title: {
      //   text: title,
      // },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    title: {
      text: title,
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      color: '#ffffff',
      floating: true,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        fontFamily:  'Roboto',
        color:  '#ffffff'
      },
      
  }

    
  };

  const seriesObj = [
    {
      data: data,
      name: title,
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: '100%',
        zoom: {
          autoScaleYaxis: true,
        },
      },
    },
  ];

  return (
    <div className={`chart-holder mindhive-${color} shadow-center`}>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={seriesObj}
          type="area"
          height='300px'
          width='100%'
        />
      </div>
    </div>
  );
}
