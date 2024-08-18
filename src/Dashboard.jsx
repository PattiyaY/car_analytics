import { useEffect, useState } from "react";
import taladrodCar from "./data/taladrod-cars.min.json";
import NavBar from "./NavBar";

function Dashboard() {
  return (
    <>
      <NavBar />
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

  useEffect(() => {
    groupCarsByBrand();
  }, []);

  return (
    <div className="flex flex-col my-5 text-white">
      <div className="flex flex-row justify-between">
        <div className="mx-2 bg-black w-1/2">pie chart</div>
        <div className="mx-2 bg-black w-1/2">bar stack</div>
      </div>
      {Object.keys(brandToCarsMap).map((carModel) => (
        <div key={carModel} className="p-1 w-full">
          <details className="bg-black rounded px-5">
            <summary className="text-xl">{carModel}</summary>
            <table
              className="border-collapse table-auto w-full text-sm mb-6"
              key={carModel}
            >
              <thead>
                <tr>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    #
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Model
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
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
  );
}

export default Dashboard;
