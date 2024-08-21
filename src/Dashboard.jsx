import { useState, useEffect } from "react";
import taladrodCar from "./data/taladrod-cars.min.json";
import StackBar from "./StackBar";

function Dashboard() {
  return (
    <>
      <Table />
    </>
  );
}

function Table() {
  const [highlightItems, setHighlightItems] = useState([
    {
      brand: "TOYOTA",
      model: "JAZZ",
      Img600: "https://imgc1.taladrod.com/c/cidx/012/319/01_1.jpg",
      Currency: "Baht",
      Status: "new",
      NameMMT: "HONDA JAZZ 1.5 i-VTEC V ปี08-14",
      Prc: "258,000",
      Province: "Bangkok",
    },
    {
      brand: "TOYOTA",
      model: "JAZZ",
      Img600: "https://imgc1.taladrod.com/c/cidx/012/319/01_1.jpg",
      Currency: "Baht",
      Status: "new",
      NameMMT: "HONDA JAZZ 1.5 i-VTEC V ปี08-14",
      Prc: "258,000",
      Province: "Bangkok",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("highlight", JSON.stringify(highlightItems));
  }, [highlightItems]);

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

  useState(() => {
    groupCarsByBrand();
  }, []);

  return (
    <div className="flex flex-col text-white bg-white">
      <h1 className="font-medium text-2xl p-4 mb-10 font-semibold bg-[#3C3D37] rounded">
        Car Brand Proportions
      </h1>
      {/* <div className="w-1/2">
        
      </div> */}
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
