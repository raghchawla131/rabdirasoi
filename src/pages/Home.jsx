import { Link } from "react-router-dom";
import HorizontalScroller from "../components/HorizontalScroller";
import cakeSvg from "../assets/cake.svg";
import boxSvg from "../assets/box.svg";
import IGlogo from "..//assets/rab di rasoi ig logo.png";
import {horizontalscrolldata1} from "../horizontalscrolldata-1"
import {horizontalscrolldata2} from "../horizontalscrolldata-2";

export default function Home() {
  return (
    <div id="home">
      <div className="page-1">
        <img
          className="image-pair-first"
          src="https://images.unsplash.com/photo-1608830597604-619220679440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt=""
        />
        <img
          className="image-pair-second"
          src="https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
          alt=""
        />
        <div className="shop-now-content">
          <h1>DESSERTS DELIVERED TO YOUR DOOR</h1>
          <p>
            From impossible-to-put-down pie to iconic 3-layer cakes, our
            award-winning desserts are made for everyday celebrations. So
            whether you're sending a gift, throwing an epic birthday bash, or
            just happy it's Wednesday — these treats are sure to get the party
            started. Plus, we ship nationwide straight to your door!
          </p>
          <Link to="/shop">SHOP NOW</Link>
        </div>
      </div>
      <div className="infinite-scroll">
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
      </div>
      <div className="page-2">
        <div className="horizontal-scroller-header">
          <h1>FROM OUR BAKERY TO YOUR DOORSTEP</h1>
          <p>
            Treat your friends, fam, and even your coworkers to limited-edition
            and best-selling treats. Ships in 1-2 Days!
          </p>
        </div>
        <HorizontalScroller data={horizontalscrolldata1} />
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
            <h4>THOUGHTFULLY PACKAGED</h4>
            <p>
              We make your treats fresh and flash-freeze ‘em for peak quality.
            </p>
          </div>
        </div>
      </div>
      <div className="page-4">
        <img
          className="image-pair-first"
          src="https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt=""
        />
        <img
          className="image-pair-second"
          src="https://images.unsplash.com/photo-1561702856-b4ec96854ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt=""
        />
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
          <Link to="/shop">SHOP NOW</Link>
        </div>
      </div>
      <div className="infinite-scroll">
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
        <p>SHAKING UP THE DESSET SCENE SINCE 2021.</p>
      </div>
      <div className="page-5">
        <div className="horizontal-scroller-header">
          <h1>SHOP OUR BESTSELLERS</h1>
          <p>
            Iconic layer cakes with unfrosted sides, gooey pie, and fudgy Cake
            Truffles.
          </p>
        </div>
        <HorizontalScroller data={horizontalscrolldata2} />
      </div>
      <div className="page-6">
        <section className="social-proof">
          <div className="social-proof-header">
            <h2>WORD ON THE STREET</h2>
          </div>
          <div className="social-comments">
            <div className="social-comment comment-1">
              <p>
                "When it comes to epic birthday cakes, no one makes them better
                than the Rab di rasoi"
              </p>
            </div>
            <div className="social-comment comment-2">
              <p>
                "No matter the occasion, Rab di rasoi treats will definitely put
                a smile on someone’s face."
              </p>
            </div>
            <div className="social-comment comment-3">
              <p>
                "The chef of Rab di rasoi has created a sweet-treat kingdom
                built on Amroha’s nostalgia."
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="page-7">
        <div className="community">
          <div className="page-7-header">
            <h2>Our Community</h2>
            <p>Follow us to stay up to date on all things Rab di rasoi.</p>
          </div>
          <div className="instagram">
            <div>
              <img className="ig-logo" src={IGlogo} alt="" />
            </div>
            <div className="ig-bio">
              <h4>
                <i>
                  <a href="https://www.instagram.com/rabdirasoi/">
                    @rabdirasoi
                  </a>
                </i>
              </h4>
              <p>
                😉Sugarcoating, everything is our speciality <br />
                🍰Customized cake, Brownie, Pinata, Chocolates <br />
                🍴Pre-Order 1 day in advance <br />
                🧁100%Eggless <br />
              </p>
              <a
                className="ig-follow"
                href="https://www.instagram.com/rabdirasoi/"
              >
                Follow <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
