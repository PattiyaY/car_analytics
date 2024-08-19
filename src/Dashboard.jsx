import { useState, useRef } from "react";
import taladrodCar from "./data/taladrod-cars.min.json";
import NavBar from "./NavBar";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

function Dashboard() {
  return (
    <>
      <Table />
    </>
  );
}

function Table() {
  const [highlightItems, setHighlightItems] = useState([]);
  localStorage.setItem("highlight", JSON.stringify(highlightItems));

  const [brandToCarsMap, setBrandToCarsMap] = useState({});

  function handleOnClick(event) {
    //TODO(jan): get data of click row
    let car = event;
    setHighlightItems([car]);
  }

  function groupCarsByBrand() {
    const brandMap = new Map();

    taladrodCar["MMList"].forEach((carModel) => {
      brandMap.set(carModel["mkID"], carModel["Name"]);
    });

    const groupedCars = {};
    taladrodCar["Cars"].forEach((car) => {
      const brandName = brandMap.get(car["MkID"]);
      if (brandName) {
        if (!groupedCars[brandName]) {
          groupedCars[brandName] = [];
        }
        groupedCars[brandName].push({ Name: brandName, ...car });
      }
    });

    setBrandToCarsMap(groupedCars);
  }

  function pieChartData(brandToCarsMap) {
    const data = [];
    Object.keys(brandToCarsMap).forEach((carModel, index) => {
      const carCount = brandToCarsMap[carModel].length;
      data.push({
        id: index + 1,
        value: carCount,
        label: carModel,
      });
      // console.log(brandToCarsMap[carModel]);
    });

    data.sort((a, b) => b.value - a.value);

    return data;
  }

  const colors = [
    "#FAD02E", // Pastel Yellow
    "#F28D35", // Pastel Orange
    "#F77F7D", // Pastel Pink
    "#D7A9A3", // Pastel Red
    "#A5D8DD", // Pastel Blue
    "#B5E2A0", // Pastel Green
    "#E6B0AA", // Pastel Rose
  ];

  function barChartData(brandToCarsMap) {
    const data = [];
    const modelCountMap = {};

    // Count the occurrences of each model for each brand
    Object.keys(brandToCarsMap).forEach((carModel) => {
      brandToCarsMap[carModel].forEach((car) => {
        const key = `${carModel}-${car.Model}`;
        if (modelCountMap[key]) {
          modelCountMap[key].count += 1;
        } else {
          modelCountMap[key] = {
            brand: carModel,
            model: car.Model,
            count: 1,
          };
        }
      });
    });

    // Convert modelCountMap to an array
    for (const key in modelCountMap) {
      data.push(modelCountMap[key]);
    }

    return data;
  }

  useState(() => {
    groupCarsByBrand();
  }, []);

  return (
    <div className="flex flex-col text-white bg-white">
      <h1 className="text-center text-4xl p-4 mb-10 font-semibold bg-[#3C3D37] rounded">
        Car Brand Proportions
      </h1>
      <div className="w-1/2">
        <PieChart
          colors={colors}
          series={[
            {
              arcLabel: (item) => `(${item.value})`,
              innerRadius: 10,
              paddingAngle: 1,
              startAngle: 90,
              endAngle: 500,
              data: pieChartData(brandToCarsMap),
            },
          ]}
          width={1200}
          height={400}
        />
      </div>
      <h1 className="text-center text-4xl p-4 my-10 font-semibold bg-[#3C3D37] rounded">
        Car Models by Brand
      </h1>
      <div className="mx-2 w-1/2">
        <BarChart
          dataset={barChartData(brandToCarsMap)}
          xAxis={[{ scaleType: "band", dataKey: "brand" }]}
          series={[
            {
              dataKey: "count",
              stack: "models", // Optional: you can use stack if you have multiple series
              label: "Number of Models",
            },
          ]}
          width={1200}
          height={400}
        />
      </div>
      <div className="rounded-t-[100px] mt-20 bg-[#3C3D37] pl-2 py-3">
        <p className="text-center text-2xl mt-5 mb-10 font-semibold">
          Brands and Models
        </p>
        {Object.keys(brandToCarsMap).map((carModel) => (
          <div key={carModel} className="p-1 w-full border-slate-400 rounded">
            <details className="rounded px-5">
              <summary className="text-xl text-stone-400 hover:text-white">
                {carModel}
              </summary>
              <table
                className="border-collapse table-auto w-full text-sm mb-6 border-slate-400 mt-5"
                key={carModel}
              >
                <thead>
                  <tr>
                    <th className="border-b font-medium p-4 pt-0 pb-3 text-left">
                      Highlight
                    </th>
                    <th className="border-b font-medium p-4 pt-0 pb-3 text-left">
                      Number
                    </th>
                    <th className="border-b font-medium p-4 pt-0 pb-3 text-left">
                      Model
                    </th>
                    <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-left">
                      Price(THB)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {brandToCarsMap[carModel].map((car, index) => (
                    <tr key={`${carModel}-${index}`}>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-3 text-slate-500 dark:text-black">
                        <button onClick={handleOnClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-3 text-slate-500 dark:text-black">
                        {index + 1}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-black">
                        {car["Model"]}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-2 pr-8 text-slate-500 dark:text-black">
                        {car["Prc"]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
