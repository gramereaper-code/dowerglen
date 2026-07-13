"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/animations/counter";
import { Reveal, SectionHeading } from "@/components/animations/reveal";
import { clientMarks, metrics } from "@/lib/site";

export function TrustedClientsSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-[#080909]">
      <div className="absolute inset-0 bg-radial-reactor opacity-45" />
      <div className="site-container relative z-10">
        <SectionHeading
          eyebrow="Trusted by serious operators"
          title="Commercial repair credibility for pressure kitchens."
          copy="Rasheed Repairs has worked with recognised South African restaurant and retail brands. Official logo artwork can be dropped into /public/logos when supplied."
          align="center"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {clientMarks.map((client, index) => (
            <motion.div
              key={client}
              className="client-logo-mark group grid min-h-32 place-items-center rounded-lg border border-white/10 bg-white/[0.035] p-6 text-center text-2xl text-white/70 shadow-insetGlow transition hover:border-electric/60 hover:bg-electric/10 hover:text-white hover:shadow-electric"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
            >
              {client}
              <span className="mt-3 block text-xs font-semibold uppercase text-smoke/45 group-hover:text-smoke/80">
                text logo until approved brand asset is supplied
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.06}>
              <div className="rounded-lg border border-white/10 bg-background/60 p-6 shadow-insetGlow">
                <p className="font-display text-4xl font-black text-white md:text-5xl">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-3 text-sm font-bold uppercase text-smoke/58">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
