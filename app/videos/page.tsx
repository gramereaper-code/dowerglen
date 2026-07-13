import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { VideoGallery } from "@/components/sections/video-gallery";
import { SectionHeading } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Videos",
  description: "Local Rasheed Repairs repair videos and workshop clips with fullscreen playback."
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Repair motion, workshop clips and commercial equipment footage."
        copy="The video page uses the local MP4 files from the folder, presented as muted previews with fullscreen playback."
        image="/images/IMG-20260526-WA0024.jpg"
        badge="Local footage"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Video grid"
            title="Preview the service environment before opening the full clip."
          />
          <div className="mt-12">
            <VideoGallery />
          </div>
        </div>
      </section>
    </>
  );
}
