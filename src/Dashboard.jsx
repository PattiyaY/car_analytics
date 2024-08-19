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

  useState(() => {
    groupCarsByBrand();
  }, []);

  return (
    <div className="flex flex-col text-white bg-white">
      <div className="flex flex-row justify-between text-neutral-100 mt-20">
        <div className="mx-2 w-1/2">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={500}
            height={350}
          />
        </div>
        <div className="mx-2 w-1/2">
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["bar A", "bar B", "bar C"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [2, 5, 3],
              },
            ]}
            width={500}
            height={350}
          />
        </div>
      </div>
      <div className="rounded-t-[100px] mt-20 bg-[#3C3D37] pl-2 py-3">
        <p className="text-center text-2xl mt-5 mb-10 font-semibold">
          Brands and Models
        </p>
        {Object.keys(brandToCarsMap).map((carModel) => (
          <div key={carModel} className="p-1 w-full border-slate-400 rounded">
            <details className="rounded px-5">
              <summary className="text-xl">{carModel}</summary>
              <table
                className="border-collapse table-auto w-full text-sm mb-6 border-slate-400 mt-5"
                key={carModel}
              >
                <thead>
                  <tr>
                    <th className="border-b font-medium p-4 pt-0 pb-3 text-left">
                      #
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
