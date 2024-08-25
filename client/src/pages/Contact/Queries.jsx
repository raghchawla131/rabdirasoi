export default function Queries({ header, content, showMore, onClick }) {
  return (
    <>
      <div className="query">
        <h5 className="query-header" onClick={onClick}>
          <div className="more-info-toggle">
            +
          </div>
          {header}
        </h5>
        {showMore && <p className="query-more-info">{content}</p>}
      </div>
      <hr />
    </>
  );
}
