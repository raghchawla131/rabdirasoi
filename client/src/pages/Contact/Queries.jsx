import React from "react";

export default function Queries({ header, content, showMore, onClick }) {
  return (
    <>
      <div className="query">
        <h5 className="query-header" onClick={onClick}>
          <div className="more-info-toggle">
            {showMore ? "−" : "+"}
          </div>
          {header}
        </h5>
        <div className={`query-content ${showMore ? "open" : ""}`}>
          <p className="query-more-info">{content}</p>
        </div>
      </div>
      <hr />
    </>
  );
}
