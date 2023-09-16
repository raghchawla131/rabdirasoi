import HorizontalScroller from "../components/HorizontalScroller";
import cakeSvg from "../assets/cake.svg";
import boxSvg from "../assets/box.svg";
import tempImg from "../assets/tempImg.jpg";

export default function Home() {
  return (
    <div id="home">
      <div className="page-1">
        <div className="image-pair">
          <img className="image-pair-first" src={tempImg} alt="" />
          <img className="image-pair-second" src={tempImg} alt="" />
        </div>
        <div className="shop-now-content">
          <h1>DESSERTS DELIVERED TO YOUR DOOR</h1>
          <p>
            From impossible-to-put-down pie to iconic 3-layer cakes, our
            award-winning desserts are made for everyday celebrations. So
            whether you're sending a gift, throwing an epic birthday bash, or
            just happy it's Wednesday — these treats are sure to get the party
            started. Plus, we ship nationwide straight to your door!
          </p>
          <a href="j">SHOP NOW</a>
        </div>
        <div className="infinite-scroll">
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        </div>
      </div>
      <div className="page-2">
        <div className="horizontal-scroller-header">
          <h1>FROM OUR BAKERY TO YOUR DOORSTEP</h1>
          <p>
            Treat your friends, fam, and even your coworkers to limited-edition
            and best-selling treats. Ships in 1-2 Days!
          </p>
        </div>
        <HorizontalScroller />
      </div>
      <div className="page-3">
        <h2>
          WHY CHOOSE <span>RAB DI RASOI?</span>
        </h2>
        <div className="perks">
          <div className="perk-1">
            <img src={cakeSvg} alt="" />
            <h4>ONE-OF-A-KIND TREATS</h4>
            <p>
              Try our award-winning classic Birthday Cake and our fan-favorite
              B’Day Cake Truffles!
            </p>
          </div>
          <div className="perk-2">
            <img src={boxSvg} alt="" />
            <h4>ONE-OF-A-KIND TREATS</h4>
            <p>
              Try our award-winning classic Birthday Cake and our fan-favorite
              B’Day Cake Truffles!
            </p>
          </div>
        </div>
      </div>
      <div className="page-4">
        <div className="image-pair">
          <img className="image-pair-first" src={tempImg} alt="" />
          <img className="image-pair-second" src={tempImg} alt="" />
        </div>
        <div className="shop-now-content">
          <h1>SUMMER FUN, DELIVERED.</h1>
          <p>
            We’ve spent hours in the kitchen channeling our favorite flavors of
            summer into the layers of buttery, bright cake. Our new Strawberry
            Corn Cake brings the culinary “if it grows together, it goes
            together” rule straight to your doorstep in 1-2 days. We
            thoughtfully package all of our treats so they arrive perfectly and
            ready to enjoy. Better get those sunglasses ready :)
          </p>
          <a href="j">ORDER NOW</a>
        </div>
        <div className="infinite-scroll">
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
          <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        </div>
      </div>
      <div className="page-5">
        <div className="horizontal-scroller-header">
          <h1>SHOP OUR BESTSELLERS</h1>
          <p>
          Iconic layer cakes with unfrosted sides, gooey pie, and fudgy Cake Truffles.
          </p>
        </div>
        <HorizontalScroller />
      </div>
    </div>
  );
}
