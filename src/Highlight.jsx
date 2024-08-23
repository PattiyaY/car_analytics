import { useState } from "react";
import Card from "./Card";

function Highlight() {
  const [highlightItems, setHighlightItems] = useState(() => {
    const saved = localStorage.getItem("highlight");
    return saved ? JSON.parse(saved) : [];
  });

  function handleOnClick(car) {
    const findIndex = highlightItems.findIndex(
      (item) => item.Name === car.Name && item.NameMMT === car.NameMMT
    );

    const updatedHighlightItems = highlightItems.filter(
      (_, index) => index !== findIndex
    );

    setHighlightItems(updatedHighlightItems);
    localStorage.setItem("highlight", JSON.stringify(updatedHighlightItems));
  }

  return (
    <div className="px-10 flex gap-5">
      {highlightItems.map((each, index) => (
        <Card key={index} data={each} onClick={handleOnClick} />
      ))}
    </div>
  );
}

export default Highlight;
