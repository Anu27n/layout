import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = ({ areas, areaValues, isOverCapacity }) => {
  const totalArea = areas.reduce((acc, item) => acc + item.value, 0);

  const colors = {
    'Linear Workspace': ['#008FFB', '#00A3FF'], // Shades of Blue
    'L-Type Workspace': ['#FF4560', '#FF6F61'], // Shades of Red
    'MD Cabin': ['#FEB019', '#FFC107'], // Shades of Yellow
    'Manager Cabin': ['#775DD0', '#A597FF'], // Shades of Purple
    'Small Cabin': ['#00E396', '#66DA26'], // Shades of Green
    'UPS Room': ['#546E7A', '#758AA2'], // Shades of Gray
    'BMS Room': ['#26A69A', '#33B2DF'], // Shades of Teal
    'Server Room': ['#D4526E', '#F46036'] // Shades of Pink
  };

  const options = {
    series: [
      {
        data: areas.map((item, index) => {
          const colorArray = colors[item.name] || ['#00E396']; // Default color
          const color = isOverCapacity ? '#FF0000' : colorArray[index % colorArray.length]; // Red if over capacity
          return {
            x: item.name,
            y: item.value,
            fillColor: color
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