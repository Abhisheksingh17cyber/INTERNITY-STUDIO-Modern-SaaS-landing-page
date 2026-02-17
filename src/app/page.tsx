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
      <div className="relative">
        <ParticleField />
        <HeroSection />
      </div>

      {/* 2. Trust Bar — scrolling press mentions */}
      <TrustBar />

      {/* 3. Watch Build — scroll-synced assembly (sticky) */}
      <WatchBuildAnimation />

      {/* 4. Features — hover lift + gold border glow cards */}
      <FeaturesGrid />

      {/* 5. Press Badges — muted silver logos + trust line */}
      <PressBadges />

      {/* 6. Showcase — featured products (sticky horizontal scroll) */}
      <ShowcaseSection />

      {/* 7. Problem → Solution — the "why" */}
      <ProblemSolution />

      <ParallaxDivider />

      {/* 8. Collections — browse by category */}
      <CollectionReveal />

      {/* 9. Limited Editions — scarcity-driven section */}
      <LimitedEditions />

      {/* 10. Video — cinematic brand film */}
      <VideoShowcase />

      {/* 11. Benefits — ownership experience */}
      <BenefitsSection />

      <ParallaxDivider />

      {/* 12. Heritage — craftsmanship timeline */}
      <HeritageTimeline />

      {/* 13. Testimonials — collector stories & social proof */}
      <TestimonialsSection />

      {/* 14. Statement — brand message */}
      <StatementBlock />

      {/* 15. Premium CTA — "Own a Legacy." + shimmer */}
      <CTASection />
    </>
  );
}
