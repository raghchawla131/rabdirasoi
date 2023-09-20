import { useState } from "react";

export default function Queries({ header, content }) {
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <>
      <div className="query">
        <h5>
          {header}
          <button onClick={handleClick}>+</button>
        </h5>
        {showMore && <p>{content}</p>}
      </div>
      <hr />
    </>
  );
}
