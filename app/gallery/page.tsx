import type { Metadata } from "next";
import { FilterableGallery } from "@/components/sections/filterable-gallery";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Immersive Rasheed Repairs gallery with fullscreen previews, category filters and local repair images."
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Immersive repair media from real equipment environments."
        copy="Browse commercial kitchen equipment, refrigeration, installation and repair visuals with cinematic filtering and fullscreen preview."
        image="/images/IMG-20260526-WA0025.jpg"
        badge="Lightbox gallery"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="Media grid" title="Local folder images first, internet visuals second." />
          <div className="mt-10">
            <FilterableGallery />
          </div>
        </div>
      </section>
    </>
  );
}
