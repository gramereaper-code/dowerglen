import type { Metadata } from "next";
import { Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/animations/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { clientMarks, metrics } from "@/lib/site";
import { Counter } from "@/components/animations/counter";

export const metadata: Metadata = {
  title: "Clients",
  description: "Client trust page for Rasheed Repairs, including known commercial brands and nationwide repair credibility."
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Trusted around recognised South African food and retail operations."
        copy="Rasheed Repairs has worked with RocoMamas, Mugg & Bean, SPAR and Chicken Licken environments, supporting the kind of equipment that keeps daily operations moving."
        image="/images/IMG-20260526-WA0021.jpg"
        badge="Commercial credibility"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Logo wall"
            title="Brands and environments where repair quality matters."
            copy="Official logo files were not provided, so these are premium text marks. Drop approved logo assets into /public/logos to replace them."
            align="center"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {clientMarks.map((client, index) => (
              <Reveal key={client} delay={index * 0.06}>
                <article className="group min-h-52 rounded-lg border border-white/10 bg-white/[0.035] p-7 text-center shadow-insetGlow transition hover:border-electric/60 hover:bg-electric/10 hover:shadow-electric">
                  <div className="mx-auto grid size-14 place-items-center rounded-full border border-electric/35 bg-electric/10 text-electric">
                    <Building2 size={25} />
                  </div>
                  <h2 className="mt-8 font-display text-3xl font-black uppercase text-white">{client}</h2>
                  <p className="mt-4 text-xs font-bold uppercase text-smoke/45">Text mark pending official asset</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-white/10 bg-background/70 p-6 text-center shadow-insetGlow">
                <p className="font-display text-4xl font-black text-white">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-3 text-xs font-bold uppercase text-smoke/58">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/10 bg-radial-reactor">
        <div className="site-container grid gap-6 md:grid-cols-3">
          {["Uptime-focused service", "Commercial kitchen awareness", "Clear repair communication"].map((item) => (
            <article key={item} className="rounded-lg border border-white/10 bg-black/35 p-7 shadow-insetGlow">
              <ShieldCheck className="text-reactor" size={30} />
              <h3 className="mt-6 font-display text-2xl font-black uppercase text-white">{item}</h3>
              <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-smoke/70">
                <CheckCircle2 className="mt-1 shrink-0 text-electric" size={18} />
                Service positioning for restaurants, franchises, food retail and high-demand equipment rooms.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
