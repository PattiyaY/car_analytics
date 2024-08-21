// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const pieChartData = (brandToCarsMap) => {
  const data = [];
  Object.keys(brandToCarsMap).forEach((carModel, index) => {
    const carCount = brandToCarsMap[carModel].length;
    data.push({
      id: index + 1,
      value: carCount,
      label: carModel,
    });
  });

  data.sort((a, b) => b.value - a.value);
  return data;
};

const PieChart = ({ brandToCarsMap }) => {
  const dataFromFunction = pieChartData(brandToCarsMap);

  const data = {
    labels: dataFromFunction.map((item) => item.label),
    datasets: [
      {
        data: dataFromFunction.map((item) => item.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#C0C0C0",
          "#FF9F40",
          "#FF6F61",
          "#6B5B95",
          "#88B04B",
          "#F7CAC9",
          "#92A8D1",
          "#F4A261",
          "#F1C40F",
          "#E67E22",
          "#D35400",
          "#9B59B6",
          "#34495E",
          "#16A085",
          "#1F618D",
          "#D5DBDB",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Car Brands Distribution</h2>
      <div className="w-full h-full">
        <Pie data={data} options={options} width={600} height={400} />
      </div>
    </div>
  );
};

PieChart.propTypes = {
  brandToCarsMap: PropTypes.object.isRequired,
};

export default PieChart;
