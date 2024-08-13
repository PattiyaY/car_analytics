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
                {Object.keys(data).map((carModel) =>
                  data[carModel].map((car, index) => (
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
                  ))
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
