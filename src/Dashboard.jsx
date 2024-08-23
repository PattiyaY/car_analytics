import { useState, useEffect } from "react";
import taladrodCar from "./data/taladrod-cars.min.json";
import StackBar from "./StackBar";
import PieChart from "./PieChart";

function Dashboard() {
  return (
    <>
      <Table />
    </>
  );
}

function Table() {
  const [highlightItems, setHighlightItems] = useState(() => {
    const saved = localStorage.getItem("highlight");
    return saved ? JSON.parse(saved) : [];
  });
  const [brandToCarsMap, setBrandToCarsMap] = useState({});

  function handleOnClickRemove(car) {
    setHighlightItems((prev) => {
      return prev.filter((item) => item.Cid !== car.Cid);
    });
  }

  function handleOnClickAdd(car) {
    setHighlightItems((prev) => [...prev, car]);
  }

  useEffect(() => {
    localStorage.setItem("highlight", JSON.stringify(highlightItems));
  }, [highlightItems]);

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

    localStorage.setItem("groupedCars", JSON.stringify(groupedCars));
    setBrandToCarsMap(groupedCars);
  }

  useEffect(() => {
    const savedGroupedCars = localStorage.getItem("groupedCars");
    const savedHighlightedItems = localStorage.getItem("highlight");

    if (savedGroupedCars) {
      setBrandToCarsMap(JSON.parse(savedGroupedCars));
    } else {
      groupCarsByBrand();
    }

    if (savedHighlightedItems) {
      setHighlightItems(JSON.parse(savedHighlightedItems));
    }
  }, []);

  function checkInHighlightedItems(car) {
    return highlightItems.some((item) => item.Cid === car.Cid);
  }

  return (
    <div className="flex flex-col text-white bg-white">
      <h1 className="font-medium text-2xl p-4 mb-10 font-semibold bg-[#3C3D37] rounded">
        Car Brand Proportions
      </h1>
      <div className="flex justify-center w-full w-screen h-100vh mt-10">
        <PieChart brandToCarsMap={brandToCarsMap} />
      </div>
      <h1 className="font-medium text-2xl p-4 my-10 font-semibold bg-[#3C3D37] rounded">
        Car Models by Brand
      </h1>
      <div className="flex justify-center w-full w-screen h-100vh mt-10">
        <StackBar brandToCarsMap={brandToCarsMap} />
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
                        {checkInHighlightedItems(car) ? (
                          <button onClick={() => handleOnClickRemove(car)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M 6 2 C 5.861875 2 5.7278809 2.0143848 5.5976562 2.0410156 C 4.686084 2.2274316 4 3.033125 4 4 L 4 22 L 12 19 L 20 22 L 20 4 C 20 3.8625 19.985742 3.7275391 19.958984 3.5976562 C 19.799199 2.8163086 19.183691 2.2008008 18.402344 2.0410156 C 18.272119 2.0143848 18.138125 2 18 2 L 6 2 z"></path>
                            </svg>
                          </button>
                        ) : (
                          <button onClick={() => handleOnClickAdd(car)}>
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
                        )}
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
