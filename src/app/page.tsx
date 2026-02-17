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

      {/* 2. Trust Bar — social proof logos & stats */}
      <TrustBar />

      {/* 3. Problem → Solution — the "why" before features */}
      <ProblemSolution />

      <ParallaxDivider />

      {/* 4. Features — "Why Choose Internity" */}
      <FeaturesGrid />

      {/* 5. Benefits — ownership experience */}
      <BenefitsSection />

      <ParallaxDivider />

      {/* 6. Showcase — featured products horizontal scroll */}
      <ShowcaseSection />

      {/* 7. Video — cinematic brand film */}
      <VideoShowcase />

      {/* 8. Collections — browse by category */}
      <CollectionReveal />

      <ParallaxDivider />

      {/* 9. Testimonials — collector stories */}
      <TestimonialsSection />

      {/* 10. Statement — brand message */}
      <StatementBlock />

      {/* 11. Final CTA */}
      <CTASection />
    </>
  );
}
