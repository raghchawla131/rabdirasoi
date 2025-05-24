import HeroSection from "./Sections/HeroSection";
import InfiniteScroll from "./Sections/InfiniteScroll";
import BakerySection from "./Sections/BakerySection";
import PerksSection from "./Sections/PerksSection";
import SocialProof from "./Sections/SocialProof";
import CommunitySection from "./Sections/CommunitySection";
import YContainer from "../../components/Container/YContainer";

export default function Home() {
  const productIdsBestSellers = ["1", "2", "3", "4", "5", "6"];

  return (
    <YContainer>
      <HeroSection />
      <InfiniteScroll />
      <BakerySection productIds={productIdsBestSellers} />
      <PerksSection />
      <HeroSection />
      <InfiniteScroll />
      <BakerySection productIds={productIdsBestSellers} />
      <SocialProof />
      <CommunitySection />
    </YContainer>
  );
}
