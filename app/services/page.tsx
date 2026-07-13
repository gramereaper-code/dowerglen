import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/animations/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full Rasheed Repairs service matrix for restaurant kitchen equipment, refrigeration, fryers, grills, electrical faults and household appliances."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Commercial repair systems for kitchens, refrigeration and appliances."
        copy="Each service is structured around intake, diagnosis, repair planning, safety checks and operational testing."
        image="/images/IMG-20260526-WA0021.jpg"
        badge="Full repair matrix"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="What we repair"
            title="From fry stations to cold rooms, every service has a practical diagnostic path."
          />

          <div className="mt-14 grid gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={(index % 3) * 0.05}>
                  <article className="group grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-insetGlow lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-[320px] overflow-hidden">
                      <Image src={service.image} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 42vw, 100vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-transparent" />
                      <div className="absolute left-6 top-6 grid size-14 place-items-center rounded-full border border-electric/45 bg-electric/14 text-electric shadow-electric">
                        <Icon size={26} />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-7 md:p-9">
                      <div>
                        <p className="eyebrow">Service {String(index + 1).padStart(2, "0")}</p>
                        <h2 className="mt-4 font-display text-3xl font-black uppercase text-white md:text-5xl">{service.title}</h2>
                        <p className="mt-5 max-w-3xl text-sm leading-7 text-smoke/70 md:text-base">{service.summary}</p>
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {service.breakdown.map((step) => (
                            <div key={step} className="flex items-center gap-3 rounded-lg border border-white/10 bg-background/60 p-4 text-sm text-smoke/72">
                              <CheckCircle2 className="text-reactor" size={18} />
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8">
                        <Button asChild variant="secondary">
                          <Link href={`/quote-request?service=${encodeURIComponent(service.title)}`}>
                            Request This Service
                            <ArrowUpRight size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
