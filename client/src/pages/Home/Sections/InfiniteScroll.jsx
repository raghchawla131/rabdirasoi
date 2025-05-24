import "./InfiniteScroll.css";

export default function InfiniteScroll() {
  return (
    <div className="infinite-scroll">
      <div className="scroll-content">
        {[...Array(10)].map((_, idx) => (
          <p key={idx}>SHAKING UP THE DESSERT SCENE SINCE 2021.</p>
        ))}
      </div>
    </div>
  );
}
