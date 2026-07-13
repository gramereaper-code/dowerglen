import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPinned, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/animations/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { processSteps, provinces, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The Rasheed Repairs story, technical approach and nationwide South African repair coverage."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Rasheed"
        title="A field-tested technician for demanding equipment environments."
        copy="Rasheed Repairs is built around hands-on repair experience, commercial kitchen urgency and a disciplined diagnostic process for restaurants, retail sites and homes."
        image="/images/IMG-20260526-WA0025.jpg"
        badge="Premium technical service"
      />

      <section className="section-pad">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/10">
              <Image src="/images/IMG-20260526-WA0024.jpg" alt="Rasheed Repairs technician at a commercial kitchen repair site" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="eyebrow">Workshop reality</p>
                <p className="mt-2 max-w-sm text-sm leading-7 text-smoke/72">
                  Real local media from the provided repair folder is used throughout the site.
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Mission"
              title="Reduce downtime with precise diagnostics and practical repair work."
              copy="The brand is positioned as a premium industrial service because the work itself affects revenue, safety and trust. Every service path is designed around diagnosis, repair planning and final operational testing."
            />
            <div className="mt-8 grid gap-4">
              {processSteps.map((step) => (
                <Reveal key={step}>
                  <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <CheckCircle2 className="text-reactor" size={22} />
                    <span className="font-semibold text-smoke/82">{step}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-[#070808]">
        <div className="site-container">
          <SectionHeading
            eyebrow="Experience timeline"
            title="Built from field calls, franchise pressure and machine-level repair detail."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="relative min-h-72 rounded-lg border border-white/10 bg-background/70 p-7 shadow-insetGlow">
                  <div className="absolute left-7 top-0 h-px w-20 bg-electric" />
                  <p className="eyebrow">{item.year}</p>
                  <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-smoke/68">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Nationwide coverage"
              title="Service coverage across South Africa."
              copy="The service model is presented nationwide. Province-specific scheduling and callout rules can be refined once business operations details are supplied."
            />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {provinces.map((province) => (
                <div key={province} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-bold text-smoke/75">
                  {province}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-radial-reactor p-7 shadow-insetGlow">
            <div className="grid size-14 place-items-center rounded-full border border-electric/40 bg-electric/10 text-electric">
              <ShieldCheck size={26} />
            </div>
            <h3 className="mt-7 font-display text-3xl font-black uppercase text-white">Certifications</h3>
            <p className="mt-4 text-sm leading-7 text-smoke/72">
              Verified certification documents were not provided in the folder. This section is ready for approved electrical,
              refrigeration, manufacturer or safety certificates once supplied.
            </p>
            <div className="mt-6 grid gap-3">
              {["Electrical safety certificate pending", "Refrigeration handling document pending", "Manufacturer training proof pending"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-smoke/70">
                  <MapPinned size={16} className="text-electric" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
