import HorizontalScroller from "../../../components/HorizontalScroller/HorizontalScroller";
import XContainer from "../../../components/Container/XContainer";
import './FeaturedItems.css';

export default function FeaturedItems({ productIds }) {
  return (
    <XContainer>
      <div className="page-2">
        <div className="horizontal-scroller-header">
          <h1>FROM OUR BAKERY TO YOUR DOORSTEP</h1>
          <p>
            Treat your friends, fam, and even your coworkers...
          </p>
        </div>
        <HorizontalScroller data={productIds} />
      </div>
    </XContainer>
  );
}
