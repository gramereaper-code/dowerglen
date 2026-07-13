import type { Metadata } from "next";
import { BeforeAfter } from "@/components/sections/before-after";
import { FilterableGallery } from "@/components/sections/filterable-gallery";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Premium Rasheed Repairs portfolio with before-after comparison, masonry gallery and repair category filtering."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Repair proof, machine detail and commercial equipment environments."
        copy="A premium showcase built from local repair media first, with selected royalty-free internet visuals for cinematic industrial depth."
        image="/images/IMG-20260526-WA0022.jpg"
        badge="Before / after + masonry"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Before and after"
            title="Slide through diagnostic context and operational readiness."
            copy="The current comparison uses available folder images as a representative portfolio interaction. True matching before-and-after pairs can be swapped in when supplied."
          />
          <div className="mt-12">
            <BeforeAfter />
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/10 bg-[#070808]">
        <div className="site-container">
          <SectionHeading
            eyebrow="Filtered showcase"
            title="Restaurant equipment, commercial repairs, appliances and installations."
          />
          <div className="mt-10">
            <FilterableGallery mode="portfolio" />
          </div>
        </div>
      </section>
    </>
  );
}
