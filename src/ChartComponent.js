import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = ({ areas, areaValues }) => {
  const colors = {
    'open workspaces': ['#008FFB', '#00A3FF'], // Shades of Blue
    'cabins': ['#FF4560', '#FF6F61'], // Shades of Red
    'public spaces': ['#FEB019', '#FFC107'] // Shades of Yellow
  };

  const data = Object.keys(areas).map((key, index) => {
    const mainCategory = key.split(' ')[0]; // Extract main category
    const colorArray = colors[mainCategory] || ['#00E396']; // Default color
    const color = colorArray[index % colorArray.length]; // Cycle through shades

    return {
      x: key,
      y: areas[key] * areaValues[key],
      color: color
    };
  });

  const totalArea = data.reduce((acc, item) => acc + item.y, 0);

  const options = {
    series: [
      {
        data: data
      }
    ],
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap'
    },
    title: {
      text: 'Area Distribution of Workspaces'
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
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="treemap" height={350} />
    </div>
  );
};

export default ChartComponent;