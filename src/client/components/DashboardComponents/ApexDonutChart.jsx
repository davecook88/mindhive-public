import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Preloader from '../Preloader'

function ApexDonutChart({ data, color, title, showLabels, units }) {
  const options = {
    labels: ['Protein', 'Fat', 'Carbs'],
    dataLabels: {
      style: {
        fontSize: '1.2em',
        fontFamily:'Roboto, Arial, sans-serif'
      }
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(1) + 'g'
      }
      
    },
    stroke: {
      show: false,
    
    },
    colors:['#2398f4', '#b4e720', '#f32d12'],
    legend: {
      show:false,
    }
  };


  const seriesObj = [
    {
      data: data,
      name: title,
    },
  ];
  return (
    <div className={`chart-holder mindhive-${color} row`}>
      <div id="chart" className="col s6">
        <ReactApexChart
          series={data}
          options={options}
          type="pie"
          height='100%'
          width='100%'
        />
      </div>
      {showLabels ? (
        <div className="chart-subtitle inline col s6">
          <div>average protein:<span style={{color:"#2398f4"}}> {data[0].toFixed(1)}g</span> </div>
          <div>average fat:<span style={{color:"#b4e720"}}> {data[1].toFixed(1)}g</span> </div>
          <div>average carbs:<span style={{color:'#f32d12'}}> {data[2].toFixed(1)}g</span> </div>
        </div>
      ) : null}
    </div>
  )
}

export default ApexDonutChart;