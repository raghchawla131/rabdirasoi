import HorizontalScrollerItems from "./HorizontalScrollerItems";

export default function HorizontalScroller( {data} ) {

  return (
    <>
      <div className="horizontal-scroller">
        {data.map((product) => (
          <HorizontalScrollerItems key={product.key} data={product} />
        ))}
      </div>
    </>
  );
}
