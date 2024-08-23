import newImg from "./images/new.png";

function Card({ data, onClick }) {
  function handleOnClick(data) {
    onClick(data);
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="relative">
        <img className="rounded-t-lg w-full" src={data.Img600} alt="" />
        {data.Status === "new" ? (
          <img
            className="absolute top-0 right-0"
            src={newImg}
            alt="new"
            width={100}
          />
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {data.Name}
            {`, `}
            {data.model}
          </h5>
          <p className="text-sm content-center ml-3">{data.Province}</p>
        </div>
        <p className="mb-3 font-normal text-gray-700 ">{data.NameMMT}</p>
        <p className="mb-3 font-normal text-gray-700 ">
          Price: {data.Prc} {data.Currency}
        </p>
        <button
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          onClick={() => handleOnClick(data)}
        >
          Remove
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;
