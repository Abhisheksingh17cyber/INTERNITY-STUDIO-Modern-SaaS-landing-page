'use client';

import dynamic from 'next/dynamic';
import Preloader from '@/components/landing/Preloader';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import ProblemSolution from '@/components/landing/ProblemSolution';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ParallaxDivider from '@/components/landing/ParallaxDivider';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import CollectionReveal from '@/components/landing/CollectionReveal';
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

      {/* 1. Hero — strong value prop + CTA above fold */}
      <div className="relative">
        <ParticleField />
        <HeroSection />
      </div>

      {/* 2. Trust Bar — instant credibility */}
      <TrustBar />

      {/* 3. Showcase — featured products (early product exposure) */}
      <ShowcaseSection />

      {/* 4. Problem → Solution — the "why" */}
      <ProblemSolution />

      <ParallaxDivider />

      {/* 5. Features — "Why Choose Internity" */}
      <FeaturesGrid />

      {/* 6. Collections — browse by category */}
      <CollectionReveal />

      {/* 7. Video — cinematic brand film */}
      <VideoShowcase />

      {/* 8. Benefits — ownership experience */}
      <BenefitsSection />

      <ParallaxDivider />

      {/* 9. Watch Build — scroll-synced assembly animation */}
      <WatchBuildAnimation />

      {/* 10. Heritage — craftsmanship timeline */}
      <HeritageTimeline />

      {/* 11. Testimonials — collector stories & social proof */}
      <TestimonialsSection />

      {/* 12. Statement — brand message */}
      <StatementBlock />

      {/* 13. Final CTA — conversion close */}
      <CTASection />
    </>
  );
}
