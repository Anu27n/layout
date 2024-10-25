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
  financeRoom: "Finance Room",
  executiveWashroom: "Executive Washroom",
  breakoutRoom: "Breakout Room"
};

const Treemap = ({ totalArea = 4000, areas, areaValues }) => {
  const colors = {
    'Linear Workspace': '#6495ED',
    'L-Type Workspace': '#4169E1',
    'MD Cabin': '#FF6347',
    'Manager Cabin': '#FF7F50',
    'Small Cabin': '#FFC0CB',
    'UPS Room': '#20B2AA',
    'BMS Room': '#008080',
    'Server Room': '#40E0D0',
    'Reception': '#ADD8E6',
    'Lounge/Pantry': '#E6E6FA',
    'Fitness Zone': '#E6E6FA',
    'Sales Team': '#9370DB',
    'Phone Booth': '#BA55D3',
    'Discussion Room': '#3CB371',
    'Interview Room': '#32CD32',
    'Conference Room': '#FFD700',
    'Board Room': '#FFE4B5',
    'Meeting Room': '#FFDAB9',
    'Meeting Room (Large)': '#FFDAB9',
    'HR Room': '#90EE90',
    'Finance Room': '#5F9EA0',
    'Available Space': '#D3D3D3'
  };

  const validTotalArea = totalArea > 0 ? totalArea : 4000;

  const builtArea = Object.keys(areas).reduce((acc, key) => acc + areas[key] * areaValues[key], 0);
  const availableArea = validTotalArea - builtArea;

  const series = [
    ...Object.keys(areas).map(key => ({
      x: fullNames[key] || key,
      y: areas[key] * areaValues[key],
      fillColor: colors[fullNames[key]] || '#000000'
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
      height: '100%', // Responsive height
      toolbar: {
        show: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
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
        enableShades: false,
        hover: {
          // Hover effect
          enabled: true,
          opacity: 0.7
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          const percentage = ((value / validTotalArea) * 100).toFixed(2);
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
        if (typeof val === 'number') {
          const percentage = ((val / validTotalArea) * 100).toFixed(2);
          return `${opts.w.globals.labels[opts.dataPointIndex]}: ${percentage}%`;
        }
        return `${opts.w.globals.labels[opts.dataPointIndex]}: ${val}`;
      }
    }
  };

  return (
    <div id="chart" aria-labelledby="treemap-title">
      <h2 id="treemap-title" style={{ display: 'none' }}>Area Distribution of Workspaces</h2>
      <ReactApexChart options={options} series={[{ data: series }]} type="treemap" height={550} />
    </div>
  );
};

export default Treemap;
