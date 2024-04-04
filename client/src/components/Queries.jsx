export default function Queries({ header, content, showMore, onClick }) {

  return (
    <>
      <div className="query">
        <h5>
          {header}
          <button onClick={onClick}>+</button>
        </h5>
        {showMore && <p>{content}</p>}
      </div>
      <hr />
    </>
  );
}
