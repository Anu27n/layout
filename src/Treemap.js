import React from 'react';
import ReactApexChart from 'react-apexcharts'; // Ensure this import is correct
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

const Treemap = ({ totalArea, areas, areaValues }) => {
  const colors = {
    'Linear Workspace': '#6495ED',
    'L-Type Workspace': '#4169E1',
    'MD Cabin': '#FF6347',
    'Manager Cabin': '#FF7F50',
    'Small Cabin': '#FFC0CB',
    'UPS Room': '#20B2AA',
    'BMS Room': '#008080',
    'Server Room': '#40E0D0',
    'Available Space': '#D3D3D3'
  };

  const builtArea = Object.keys(areas).reduce((acc, key) => acc + areas[key] * areaValues[key], 0);
  const availableArea = totalArea - builtArea;

  const series = [
    ...Object.keys(areas).map(key => ({
      x: fullNames[key] || key, // Fallback to key if fullNames[key] is undefined
      y: areas[key] * areaValues[key],
      fillColor: colors[fullNames[key]] || '#000000' // Fallback color
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
          if (totalArea > 0) {
            const percentage = ((value / totalArea) * 100).toFixed(2);
            return `${percentage}% of total area`;
          }
          return 'N/A'; // or return '0% of total area' if you prefer
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
