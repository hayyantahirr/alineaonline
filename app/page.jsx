import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Stats from "@/components/home/Stats";
import DirectorStory from "@/components/home/DirectorStory";
import SubjectsSpotlight from "@/components/home/SubjectsSpotlight";
import InstagramReels from "@/components/home/InstagramReels";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <div className="w-full bg-background text-on-background">
      <Hero />
      <TrustStrip />
      <Stats />
      <DirectorStory />
      <SubjectsSpotlight />
      <InstagramReels />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
