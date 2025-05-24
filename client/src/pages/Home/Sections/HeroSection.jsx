import { useNavigate } from "react-router-dom";
import './HeroSection.css'; 
import XContainer from "../../../components/Container/XContainer";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <XContainer>

    <div className="page-1">
      <img
        className="image-pair-first"
        src="https://images.unsplash.com/photo-1608830597604-619220679440?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
        alt=""
      />
      <img
        className="image-pair-second"
        src="https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1935&q=80"
        alt=""
      />
      <div className="shop-now-content">
        <h1>DESSERTS DELIVERED TO YOUR DOOR</h1>
        <p>
          From handcrafted pies to iconic 3-layer cakes, we bring the magic of a bakery straight to your doorstep. Whether it’s a birthday, a surprise gift, or a midweek pick-me-up, our 100% eggless, made-to-order treats are baked with love and packed with care. Every bite delivers warmth, nostalgia, and flavor that feels like home — because that's exactly where it’s made.
        </p>
        <button onClick={() => navigate("/shop")} className="shop-btn">
          SHOP NOW
        </button>
      </div>
    </div>
    </XContainer>
  );
}
