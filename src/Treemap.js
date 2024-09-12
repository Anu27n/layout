import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './styles.css';

const fullNames = {
  linear: "Linear Workspace",
  lType: "L-Type Workspace",
  md: "MD Cabin",
  manager: "Manager Cabin",
  small: "Small Cabin",
  ups: "UPS Room",
  bms: "BMS Room",
  server: "Server Room"
};

const Treemap = ({ totalArea, builtArea, availableArea, areas, areaValues }) => {
  const colors = {
    'Linear Workspace': '#6495ED', // Cornflower Blue
    'L-Type Workspace': '#4169E1', // Royal Blue
    'MD Cabin': '#FF6347', // Tomato Red
    'Manager Cabin': '#FF7F50', // Coral
    'Small Cabin': '#FFC0CB', // Light Pink
    'UPS Room': '#20B2AA', // Light Sea Green
    'BMS Room': '#008080', // Teal
    'Server Room': '#40E0D0', // Turquoise
    'Available Space': '#D3D3D3' // Light Grey
  };

  const series = [
    ...Object.keys(areas).map(key => ({
      x: fullNames[key],
      y: areas[key] * areaValues[key],
      fillColor: colors[fullNames[key]]
    })),
    {
      x: 'Available Space',
      y: availableArea,
      fillColor: colors['Available Space']
    }
  ];

  const options = {
    chart: {
      type: 'treemap',
      height: 350,
      toolbar: {
        show: true
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center'
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
        enableShades: false
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
      <ReactApexChart options={options} series={[{ data: series }]} type="treemap" height={350} />
    </div>
  );
};

export default Treemap;