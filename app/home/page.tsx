import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { HomeHero } from "@/components/sections/home-hero";
import { MechanicalCoreSection } from "@/components/sections/mechanical-core-section";
import { RevealTextSection } from "@/components/sections/reveal-text-section";
import { ServicesPreviewSection } from "@/components/sections/services-preview-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { TrustedClientsSection } from "@/components/sections/trusted-clients-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Cinematic premium website for Rasheed Repairs, South African commercial kitchen and appliance repair specialists."
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MechanicalCoreSection />
      <RevealTextSection />
      <TrustedClientsSection />
      <ServicesPreviewSection />
      <ShowcaseSection />
      <CtaSection />
    </>
  );
}
