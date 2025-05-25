import HeroSection from "./Sections/HeroSection";
import InfiniteScroll from "./Sections/InfiniteScroll";
import PerksSection from "./Sections/PerksSection";
import SocialProof from "./Sections/SocialProof";
import CommunitySection from "./Sections/CommunitySection";
import YContainer from "../../components/Container/YContainer";
import FeaturedItems from "./Sections/FeaturedItems";

export default function Home() {
  const productIdsBestSellers = ["1", "2", "3", "4", "5", "6"];

  return (
    <YContainer>
      <HeroSection />
      <InfiniteScroll />
      <FeaturedItems productIds={productIdsBestSellers} />
      <PerksSection />
      <HeroSection />
      <InfiniteScroll />
      <FeaturedItems productIds={productIdsBestSellers} />
      <SocialProof />
      <CommunitySection />
    </YContainer>
  );
}
