import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackBar = ({ brandToCarsMap }) => {
  function barChartData(brandToCarsMap) {
    const modelCountMap = {};

    Object.keys(brandToCarsMap).forEach((brand) => {
      brandToCarsMap[brand].forEach((car) => {
        const key = `${brand}-${car.Model}`;
        if (modelCountMap[key]) {
          modelCountMap[key].count += 1;
        } else {
          modelCountMap[key] = {
            brand: brand,
            model: car.Model,
            count: 1,
          };
        }
      });
    });

    // Convert modelCountMap to an array and sort by count
    const sortedData = Object.values(modelCountMap).sort(
      (a, b) => b.count - a.count
    );

    // Group data by brand
    const groupedData = sortedData.reduce((acc, item) => {
      if (!acc[item.brand]) {
        acc[item.brand] = {};
      }
      acc[item.brand][item.model] = item.count;
      return acc;
    }, {});

    return groupedData;
  }

  const carData = barChartData(brandToCarsMap);
  const labels = Object.keys(carData);
  const datasets = [];

  Object.keys(carData).forEach((brand, brandIndex) => {
    Object.keys(carData[brand]).forEach((model, modelIndex) => {
      const existingDataset = datasets.find(
        (dataset) => dataset.label === model
      );
      if (existingDataset) {
        existingDataset.data[brandIndex] = carData[brand][model];
      } else {
        const newDataset = {
          label: model,
          data: Array(labels.length).fill(0), // Initialize with 0s
          backgroundColor: `hsl(${modelIndex * 30}, 70%, 60%)`, // Different color for each model
        };
        newDataset.data[brandIndex] = carData[brand][model];
        datasets.push(newDataset);
      }
    });
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Car Models by Brand",
      },
      legend: {
        position: "top",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "1000px", height: "600px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Define prop types
StackBar.propTypes = {
  brandToCarsMap: PropTypes.object.isRequired,
};

export default StackBar;
