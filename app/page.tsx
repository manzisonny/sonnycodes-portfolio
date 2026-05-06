import HeroSection from "@/components/landing/HeroSection";
import StorySection from "@/components/landing/StorySection";
import GateSection from "@/components/landing/GateSection";

export default function LandingPage() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <div className="snap-start">
        <HeroSection />
      </div>
      <div className="snap-start">
        <StorySection />
      </div>
      <div className="snap-start">
        <GateSection />
      </div>
    </main>
  );
}
