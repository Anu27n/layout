import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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
  breakoutRoom: "Breakout Room",
  videoRecordingRoom: "Video Recording Room",
  other: "Other" // Add new category here
};

const Treemap = ({ totalArea, areas, areaValues }) => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [isLegendVisible, setIsLegendVisible]=useState(false);

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
    'Meeting Room': '#FA8072',
    'Meeting Room (Large)': '#FFDAB9',
    'HR Room': '#90EE90',
    'Finance Room': '#5F9EA0',
    'Executive Washroom': '#097969',
    'Available Space': '#D3D3D3',
    'Other': '#FF69B4' // Color for the "Other" category
  };

  const validTotalArea = totalArea > 0 ? totalArea : 4000;
  const builtArea = Object.keys(areas).reduce((acc, key) => acc + areas[key] * areaValues[key], 0);
  const availableArea = validTotalArea - builtArea;

  const series = [
    ...Object.keys(areas).map(key => {
      const areaOccupied = areas[key] * areaValues[key];
      const percentage = ((areaOccupied / validTotalArea) * 100).toFixed(2);
      return {
        x: `${fullNames[key] || key}: ${percentage}%`,
        y: areaOccupied,
        fillColor: colors[fullNames[key]] || '#000000'
      };
    }),
    {
      x: `Available Space: ${((availableArea / validTotalArea) * 100).toFixed(2)}%`,
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
      },
      events: {
        dataPointMouseEnter: (event, chartContext, config) => {
          const hoveredLabel = config.w.config.series[0].data[config.dataPointIndex].x;
          setHoveredArea(hoveredLabel);
        },
        dataPointMouseLeave: () => {
          setHoveredArea(null);
        }
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
        enableShades: false
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} sq ft`
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#FFFFFF']
      },
      formatter: (val, opts) => {
        if (typeof val === 'number') {
          const percentage = ((val / validTotalArea) * 100).toFixed(2);
          return `${opts.w.globals.labels[opts.dataPointIndex]} (${percentage}%)`;
        }
        return `${opts.w.globals.labels[opts.dataPointIndex]}: ${val}`;
      }
    }
  };

  const generateLegendItems = () => {
    return series
      .filter(item => item.y > 0)
      .map(item => (
        <div
          key={item.x}
          className={`legend-item ${hoveredArea === item.x ? 'blink' : ''}`}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: '4px'
          }}
          onMouseEnter={() => setHoveredArea(item.x)}
          onMouseLeave={() => setHoveredArea(null)}
        >
          <span
            className={`legend-color ${hoveredArea === item.x ? 'blink' : ''}`}
            style={{
              backgroundColor: item.fillColor,
              width: '10px',
              height: '10px',
              marginRight: '10px',
              borderRadius: '50%'
            }}
          ></span>
          <span className="legend-label" style={{ fontSize: '13px' }}>
            {item.x}
          </span>
        </div>
      ));
  };
  const toggleLegend = () => {
    setIsLegendVisible(!isLegendVisible);
  }

  useEffect(()=>{
    const handleResize=()=>{
      if(window.innerWidth>426){
        setIsLegendVisible(true);
      }else{
        setIsLegendVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return()=>{
    window.addEventListener('resize', handleResize);
    };
  },[]);

  return (
    <div id="chart" style={{ position: 'relative' }}>
    <ReactApexChart options={options} series={[{ data: series }]} type="treemap" height={350} />
    <button
      className="arrow-button"
      onClick={() => toggleLegend(!isLegendVisible)}
      style={{
        position: 'absolute',
        left: '-10px',
        top: '200px',
        opacity:'50%',
        zIndex: 1,
        display: window.innerWidth <= 425 ? 'block' : 'none',
      }}
    >
      <FontAwesomeIcon icon={isLegendVisible ? faChevronLeft : faChevronRight} />
    </button>
    <div
        className="legend-container"
        style={{
          transform: isLegendVisible ? 'translateX(0)' : 'translateX(-100%)', // Start hidden and slide in
          transition: 'transform 1s ease-in-out',
          position: 'absolute',
          top: '10%',
          left: '0',
          background: '#fff',
          padding: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          visibility: isLegendVisible ? 'visible' : 'hidden', // Fully hide off-screen
        }}
      >
        {generateLegendItems()}
      </div>
  </div>
  );
};

export default Treemap;