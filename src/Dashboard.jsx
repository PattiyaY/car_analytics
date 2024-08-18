import taladrodCar from "./data/taladrod-cars.min.json";

function Dashboard() {
  return (
    <>
      <Table />
    </>
  );
}

// "Cars": [
//     {
//         "Cid": 2766489,
//         "IsCExp": false,
//         "MkID": 29,
//         "MdID": 428,
//         "BdID": 606,
//         "Model": "JAZZ",
//         "NameMMT": "HONDA JAZZ 1.5 i-VTEC V ปี08-14",
//         "Prc": "258,000",
//         "Yr": 2011,
//         "Upd": "7",
//         "PageViews": "10",
//         "Img100": "https://imgc1.taladrod.com/c/cidx/012/319/01_1T.jpg",
//         "Img300": "https://imgc1.taladrod.com/c/cidx/012/319/01_1T3.jpg",
//         "Img600": "https://imgc1.taladrod.com/c/cidx/012/319/01_1.jpg",
//         "Icon": "https://m.taladrod.com/assets/icons/NW.png?v=1.1",
//         "Province": "Bangkok",
//         "Currency": "Baht",
//         "DPmt": "0",
//         "Status": "new"
//     },

// "MMList": [
//     {
//         "mkID": 29,
//         "mdID": 0,
//         "bdID": 0,
//         "taID": 0,
//         "Name": "HONDA"
//     },

function Table() {
  // TODO(jan): Use better variable name
  let data = {};

  /**
   * This function merge MMList: [{"Name": "HONDA"}] to Cars[{"Cid": 2766489, ...}]
   * to have the brand of the car in one place.
   *
   * How we do it?
   * By checking the `mkID` from `MMList` to `MkID` from `Cars`.
   * If match, we create a `BrandName: []` where the car object belong to that `BrandName`
   *
   * For example:
   * {
   *    TOYOTA: [{
   *      "Name": "TOYOTA",
   *      ...
   *    }]
   * }
   *
   * The formatted json object is in `data` variable
   */
  // TODO(jan): Use better function name
  (function findCarBrand() {
    // TODO(jan): Optimize brand mapping
    taladrodCar["Cars"].forEach((car) => {
      taladrodCar["MMList"].forEach((carModel) => {
        if (car["MkID"] == carModel["mkID"]) {
          let brand = carModel["Name"];
          if (brand in data) {
            data[`${brand}`].push({ Name: carModel["Name"], ...car });
          } else {
            data[`${brand}`] = [];
            data[`${brand}`].push({ Name: carModel["Name"], ...car });
          }
        }
      });
    });
  })();

  console.log(data);

  return (
    <div className="flex my-5 text-white">
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-hidden my-4">
          {Object.keys(data).map((carModel) => (
            <div key={carModel} className="p-1 w-[350px]">
              <details className="bg-slate-800 rounded px-5">
                <summary>{carModel}</summary>
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
                    {data[carModel].map((car, index) => (
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
    </div>
  );
}

export default Dashboard;
