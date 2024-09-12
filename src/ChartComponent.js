import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = ({ areas, areaValues, isOverCapacity }) => {
  const totalArea = areas.reduce((acc, item) => acc + item.value, 0);

  const colors = {
    'Linear Workspace': '#6495ED', // Cornflower Blue
    'L-Type Workspace': '#4169E1', // Royal Blue
    'MD Cabin': '#FF6347', // Tomato Red
    'Manager Cabin': '#FF7F50', // Coral
    'Small Cabin': '#FFC0CB', // Light Pink
    'UPS Room': '#20B2AA', // Light Sea Green
    'BMS Room': '#008080', // Teal
    'Server Room': '#40E0D0' // Turquoise
  };

  const options = {
    series: [
      {
        data: areas.map((item) => {
          const color = colors[item.name] || '#00E396'; // Default color if not specified
          return {
            x: item.name,
            y: item.value,
            fillColor: isOverCapacity ? '#FF0000' : color // Red if over capacity
          };
        })
      }
    ],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center'
    },
    chart: {
      height: 350,
      type: 'treemap',
      toolbar: {
        show: true
      }
    },
    title: {
      text: 'Area Distribution of Workspaces',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 1000,
              color: '#00E396'
            },
            {
              from: 1001,
              to: 5000,
              color: '#FEB019'
            },
            {
              from: 5001,
              to: 10000,
              color: '#FF4560'
            },
            {
              from: 10001,
              to: 25000,
              color: '#775DD0'
            }
          ]
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          const percentage = ((value / totalArea) * 100).toFixed(2);
          return `${percentage}% of total area`;
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#FFFFFF']
      },
      formatter: function (val, opts) {
        return `${opts.w.globals.labels[opts.dataPointIndex]}: ${val}`;
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="treemap" height={350} />
    </div>
  );
};

export default ChartComponent;