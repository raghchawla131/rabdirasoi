export default function HorizontalScroller({ data }) {
  return (
    <>
      <div className="horizontal-scroller">
        {data.map((item, key) => (
          <div className="scroll-items" key={key}>
            <div className="scroll-items-top">
              <img src={item.image} alt="productImage" />
            </div>
            <div className="scroll-items-bottom">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
