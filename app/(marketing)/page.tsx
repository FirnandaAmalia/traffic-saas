import Hero from "@/components/landing/hero";
import LogoMarquee from "@/components/landing/logo-marquee";
import SocialProof from "@/components/landing/social-proof";
import Workflow from "@/components/landing/workflow";
import FeatureGrid from "@/components/landing/feature-grid";
import AIShowcase from "@/components/landing/ai-showcase";
import DashboardShowcase from "@/components/landing/dashboard-showcase";
import Metrics from "@/components/landing/metrics";
import Testimonials from "@/components/landing/testimonials";
import PricingPreview from "@/components/landing/pricing-preview";
import FAQ from "@/components/landing/faq";
import CTA from "@/components/landing/cta";

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-900">
      <Hero />

      <LogoMarquee />

      <SocialProof />

      <div id="workflow" className="scroll-mt-24">
        <Workflow />
      </div>

      <div id="features" className="scroll-mt-24">
        <FeatureGrid />
      </div>

      <AIShowcase />

      <div id="dashboard-demo" className="scroll-mt-24">
        <DashboardShowcase />
      </div>

      <Metrics />

      <div id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </div>

      <div id="pricing" className="scroll-mt-24">
        <PricingPreview />
      </div>

      <div id="faq" className="scroll-mt-24">
        <FAQ />
      </div>

      <CTA />
    </main>
  );
}