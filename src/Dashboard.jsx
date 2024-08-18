import { useEffect, useState } from "react";
import taladrodCar from "./data/taladrod-cars.min.json";

function Dashboard() {
  return (
    <>
      <Table />
    </>
  );
}

function Table() {
  const [brandToCarsMap, setBrandToCarsMap] = useState({});

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
    <div className="flex justify-center my-5">
      <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 w-2/4">
        <div
          style={{ backgroundPosition: "10px 10px" }}
          className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
        ></div>
        <div className="relative rounded-xl overflow-auto">
          <div className="shadow-sm overflow-hidden my-8">
            <table className="border-collapse table-auto w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"></th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Brand
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Model
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Price(THB)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                {Object.keys(brandToCarsMap).map((carModel) =>
                  brandToCarsMap[carModel].map((car, index) => (
                    <tr key={index}>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 font-bold">
                        {car["Name"]}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {car["Name"]}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                        {car["Model"]}
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        {car["Prc"]}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
      </div>
    </div>
  );
}

export default Dashboard;
