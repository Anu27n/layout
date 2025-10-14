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

  // If user hasn't entered totalArea treat it as 0 (not 4000).
  // Guard calculations to avoid division by zero and negative available area.
  const validTotalArea = totalArea > 0 ? totalArea : 0;
  const builtArea = Object.keys(areas).reduce((acc, key) => acc + (areas[key] || 0) * (areaValues[key] || 0), 0);
  const availableArea = validTotalArea > 0 ? Math.max(validTotalArea - builtArea, 0) : 0;

  const series = [
    ...Object.keys(areas).map(key => {
  const areaOccupied = (areas[key] || 0) * (areaValues[key] || 0);
  const percentage = validTotalArea > 0 ? ((areaOccupied / validTotalArea) * 100).toFixed(2) : '0.00';
      return {
        x: `${fullNames[key] || key}: ${percentage}%`,
        y: areaOccupied,
        fillColor: colors[fullNames[key]] || '#000000',
        // keep the original short key so tooltip can look up the image
        key: key
      };
    }),
    {
      x: `Available Space: ${validTotalArea > 0 ? ((availableArea / validTotalArea) * 100).toFixed(2) : '0.00'}%`,
      y: availableArea,
      fillColor: colors['Available Space'],
      key: 'Available Space'
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
      enabled: true,
      // Use ApexCharts' custom tooltip HTML so we can show an image + value
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        try {
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          const key = data.key || data.x || '';
          const value = data.y || 0;
          const pct = validTotalArea > 0 ? ((value / validTotalArea) * 100).toFixed(2) : '0.00';
          // Try both camelCase and lowercase filenames; fallback to generic icon
          const imgPrimary = `/images/${key}.png`;
          const imgFallback = `/images/${String(key).toLowerCase()}.png`;
          const imgDefault = `/myicon.png`;

          const title = fullNames[key] || (typeof data.x === 'string' ? data.x.split(':')[0] : key);

          return (`<div class="custom-tooltip" style="display:flex;align-items:center;gap:12px;padding:8px;">
                    <img src="${imgPrimary}"
                         onerror="if(!this._triedLower){this._triedLower=true;this.src='${imgFallback}'}else{this.src='${imgDefault}'}"
                         style="width:64px;height:64px;object-fit:cover;border-radius:6px;border:1px solid #e6e6e6"/>
                    <div style="line-height:1.2">
                      <div style="font-weight:700;margin-bottom:6px;color:#263238">${title}</div>
                      <div style="font-size:14px;color:#37474F">${value} sq ft</div>
                      <div style="font-size:12px;color:#607D8B">${pct}% of total</div>
                    </div>
                  </div>`);
        } catch (err) {
          return '';
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
      formatter: (val, opts) => {
        const label = opts.w && opts.w.globals && opts.w.globals.labels ? opts.w.globals.labels[opts.dataPointIndex] : '';
        if (typeof val === 'number' && validTotalArea > 0) {
          const percentage = ((val / validTotalArea) * 100).toFixed(2);
          return `${label} (${percentage}%)`;
        }
        return `${label}: ${val}`;
      }
    }
  };

  // Prepare legend data (only items with non-zero values)
  const legendData = series.filter(item => item.y > 0);
  const hasLegend = legendData.length > 0;

  const generateLegendItems = () => {
    return legendData.map(item => (
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
      // Only show legend automatically on larger screens when there's legend data
      if(window.innerWidth>426 && hasLegend){
        setIsLegendVisible(true);
      }else{
        setIsLegendVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return()=>{
      // Clean up the resize listener correctly
      window.removeEventListener('resize', handleResize);
    };
  },[hasLegend]);

  return (
    <div id="chart" style={{ position: 'relative' }}>
    <ReactApexChart options={options} series={[{ data: series }]} type="treemap" height={"100%"} className='distribution-chart'/>
    {hasLegend && (
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
    )}
    {hasLegend && (
      <div
        className="legend-container"
        style={{
          // Use translate3d to encourage GPU acceleration and smoother animations
          transform: isLegendVisible ? 'translate3d(0,0,0)' : 'translate3d(-100%,0,0)',
          transition: 'transform 450ms ease-in-out',
          willChange: 'transform', // Hint to browser for optimization
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
    )}
  </div>
  );
};

export default Treemap;