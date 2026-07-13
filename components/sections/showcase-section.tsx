"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/animations/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { galleryImages } from "@/lib/media";

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [distance, setDistance] = useState(0);
  const showcase = galleryImages.slice(0, 9);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[220vh] bg-[#070808]">
      <div className="sticky top-0 overflow-hidden">
        <div className="section-pad pb-10">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industrial showcase"
              title="Repair environments, close-ups and operational machinery."
              copy="A cinematic horizontal pass through local repair photos and selected royalty-free industrial imagery."
            />
          </div>
        </div>
        <div className="relative h-[72vh] min-h-[520px] overflow-hidden">
          <div className="absolute inset-0 bg-industrial-grid bg-[length:70px_70px] opacity-20" />
          <motion.div
            ref={trackRef}
            className="flex h-full w-max items-center gap-5 px-[8vw] will-change-transform"
            style={{ x: reduced ? 0 : x }}
          >
            {showcase.map((image, index) => (
              <article
                key={`${image.src}-${index}`}
                className="scan-mask relative h-[64vh] min-h-[430px] w-[78vw] max-w-[620px] overflow-hidden rounded-lg border border-white/12 bg-white/[0.035] md:w-[46vw]"
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 46vw, 78vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-transparent to-black/22" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="eyebrow">{image.source === "local" ? "Local media" : "Internet visual"}</p>
                  <h3 className="mt-2 font-display text-2xl font-black uppercase text-white">{image.category}</h3>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
