'use client';

import dynamic from 'next/dynamic';
import Preloader from '@/components/landing/Preloader';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import ParallaxDivider from '@/components/landing/ParallaxDivider';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import CollectionReveal from '@/components/landing/CollectionReveal';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import StatementBlock from '@/components/landing/StatementBlock';
import CTASection from '@/components/landing/CTASection';
import VideoShowcase from '@/components/landing/VideoShowcase';

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Preloader />
      <div className="relative">
        <ParticleField />
        <HeroSection />
      </div>
      <ParallaxDivider />
      <FeaturesGrid />
      <ParallaxDivider />
      <ShowcaseSection />
      <VideoShowcase />
      <CollectionReveal />
      <ParallaxDivider />
      <TestimonialsSection />
      <StatementBlock />
      <CTASection />
    </>
  );
}
