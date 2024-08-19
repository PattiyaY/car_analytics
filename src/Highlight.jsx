import Card from "./Card";
import NavBar from "./NavBar";

function Highlight(data) {
  return (
    <>
      {data.map((each) => (
        <Card data={each} />
      ))}
    </>
  );
}

export default Highlight;
