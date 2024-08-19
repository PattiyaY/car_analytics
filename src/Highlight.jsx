import Card from "./Card";

function Highlight() {
  const data = JSON.parse(localStorage.getItem("highlight"));
  return (
    <div className="px-10 flex gap-5">
      {data.map((each, index) => (
        <Card key={index} data={each} />
      ))}
    </div>
  );
}

export default Highlight;
