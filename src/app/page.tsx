'use client';

import dynamic from 'next/dynamic';
import Preloader from '@/components/landing/Preloader';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import PressBadges from '@/components/landing/PressBadges';
import ProblemSolution from '@/components/landing/ProblemSolution';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ParallaxDivider from '@/components/landing/ParallaxDivider';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import CollectionReveal from '@/components/landing/CollectionReveal';
import LimitedEditions from '@/components/landing/LimitedEditions';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import VideoShowcase from '@/components/landing/VideoShowcase';
import StatementBlock from '@/components/landing/StatementBlock';
import CTASection from '@/components/landing/CTASection';
import HeritageTimeline from '@/components/landing/HeritageTimeline';

const WatchBuildAnimation = dynamic(
  () => import('@/components/landing/WatchBuildAnimation'),
  { ssr: false }
);

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Preloader />

      {/* 1. Cinematic Hero — "Time, Perfected." + radial glow */}
      <div className="relative z-[1]">
        <ParticleField />
        <HeroSection />
      </div>

      {/* 2. Trust Bar — scrolling press mentions */}
      <div className="relative z-[2]">
        <TrustBar />
      </div>

      {/* 3. Watch Build — scroll-synced assembly (PINNED) */}
      <div className="relative z-[3]">
        <WatchBuildAnimation />
      </div>

      {/* 4. Features — hover lift + gold border glow cards */}
      <div className="relative z-[4]">
        <FeaturesGrid />
      </div>

      {/* 5. Press Badges — muted silver logos + trust line */}
      <div className="relative z-[5]">
        <PressBadges />
      </div>

      {/* 6. Showcase — featured products (PINNED horizontal scroll) */}
      <div className="relative z-[6]">
        <ShowcaseSection />
      </div>

      {/* 7. Problem → Solution — the "why" */}
      <div className="relative z-[7]">
        <ProblemSolution />
      </div>

      <div className="relative z-[8]">
        <ParallaxDivider />
      </div>

      {/* 8. Collections — browse by category */}
      <div className="relative z-[9]">
        <CollectionReveal />
      </div>

      {/* 9. Limited Editions — scarcity-driven section */}
      <div className="relative z-[10]">
        <LimitedEditions />
      </div>

      {/* 10. Video — cinematic brand film */}
      <div className="relative z-[11]">
        <VideoShowcase />
      </div>

      {/* 11. Benefits — ownership experience */}
      <div className="relative z-[12]">
        <BenefitsSection />
      </div>

      <div className="relative z-[13]">
        <ParallaxDivider />
      </div>

      {/* 12. Heritage — craftsmanship timeline */}
      <div className="relative z-[14]">
        <HeritageTimeline />
      </div>

      {/* 13. Testimonials — collector stories & social proof */}
      <div className="relative z-[15]">
        <TestimonialsSection />
      </div>

      {/* 14. Statement — brand message */}
      <div className="relative z-[16]">
        <StatementBlock />
      </div>

      {/* 15. Premium CTA — "Own a Legacy." + shimmer */}
      <div className="relative z-[17]">
        <CTASection />
      </div>
    </>
  );
}
