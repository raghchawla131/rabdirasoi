import { useState } from "react";

export default function Queries({ header, content }) {
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <>
      <h4>
        {header}
        <button onClick={handleClick}>+</button>
      </h4>
      {showMore && <p>{content}</p>}
      <hr />
    </>
  );
}
