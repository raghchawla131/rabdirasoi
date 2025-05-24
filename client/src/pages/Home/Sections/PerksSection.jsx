import cakeSvg from "../../../assets/cake.svg";
import boxSvg from "../../../assets/box.svg";
import XContainer from "../../../components/Container/XContainer";
import './PerksSection.css';

export default function PerksSection() {
  return (
    <XContainer>
      <div className="page-3">
        <h2>
          WHY CHOOSE <span>RAB DI RASOI?</span>
        </h2>
        <div className="perks">
          <div className="perk-1">
            <img src={cakeSvg} alt="" />
            <h4>ONE-OF-A-KIND TREATS</h4>
            <p>Try our award-winning classic Birthday Cake...</p>
          </div>
          <div className="perk-2">
            <img src={boxSvg} alt="" />
            <h4>THOUGHTFULLY PACKAGED</h4>
            <p>We make your treats fresh and flash-freeze...</p>
          </div>
          <div className="perk-2">
            <img src={cakeSvg} alt="" />
            <h4>HANDCRAFTED WITH LOVE</h4>
            <p>Each treat is meticulously crafted...</p>
          </div>
        </div>
      </div>
    </XContainer>
  );
}
