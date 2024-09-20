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
  server: "Server Room",
  reception: "Reception",
  lounge: "Lounge/Pantry",
  fitness: "Fitness Zone",
  sales: "Sales Team",
  phoneBooth: "Phone Booth",
  discussionRoom: "Discussion Room",
  interviewRoom: "Interview Room",
  conferenceRoom: "Conference Room",
  boardRoom: "Board Room",
  meetingRoom: "Meeting Room",
  meetingRoomLarge: "Meeting Room (Large)",
  hrRoom: "HR Room",
  financeRoom: "Finance Room"
};

const Treemap = ({ totalArea, areas, areaValues }) => {
  const colors = {
    'Linear Workspace': '#6495ED', // Cornflower Blue
    'L-Type Workspace': '#4169E1', // Royal Blue
    'MD Cabin': '#FF6347', // Tomato Red
    'Manager Cabin': '#FF7F50', // Coral
    'Small Cabin': '#FFC0CB', // Light Pink
    'UPS Room': '#20B2AA', // Light Sea Green
    'BMS Room': '#008080', // Teal
    'Server Room': '#40E0D0', // Turquoise
    'Reception': '#ADD8E6', // Light Blue
    'Lounge/Pantry': '#E6E6FA', // Lavender
    'Fitness Zone': '#E6E6FA', // Lavender
    'Sales Team': '#9370DB', // Medium Purple
    'Phone Booth': '#BA55D3', // Orchid
    'Discussion Room': '#3CB371', // Medium Sea Green
    'Interview Room': '#32CD32', // Lime Green
    'Conference Room': '#FFD700', // Gold
    'Board Room': '#FFE4B5', // Moccasin
    'Meeting Room': '#FFDAB9', // Peach Puff
    'Meeting Room (Large)': '#FFDAB9', // Peach Puff
    'HR Room': '#90EE90', // Light Green
    'Finance Room': '#5F9EA0', // Cadet Blue
    'Available Space': '#D3D3D3' // Light Grey
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
          console.log("hello")
          if (totalArea > 0) {
            const percentage = ((value / totalArea) * 100).toFixed(2);
            return `${percentage}% of total area`; // Fixed syntax for template literals
          }
          return '100'; // or return '0% of total area' if you prefer
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
        return `${opts.w.globals.labels[opts.dataPointIndex]}: ${val}`; // Fixed syntax for template literals
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={[{ data: series }]} type="treemap" height={550} />
    </div>
  );
};

export default Treemap;