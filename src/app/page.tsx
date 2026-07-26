import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/features/landing/components/Hero';
import { Features } from '@/features/landing/components/Features';
import { Testimonials } from '@/features/landing/components/Testimonials';
import { FAQ } from '@/features/landing/components/FAQ';
import { CTA } from '@/features/landing/components/CTA';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
