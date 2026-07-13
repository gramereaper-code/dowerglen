import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/animations/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Commercial-style reviews for Rasheed Repairs with animated testimonial cards and star ratings."
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Professional repair experiences for high-pressure equipment users."
        copy="Commercial-style testimonials frame the kind of trust restaurants, retail operators and homeowners need from a repair specialist."
        image="/images/IMG-20260526-WA0021.jpg"
        badge="Client feedback"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Reviews"
            title="Clear communication, fast diagnostics and operational confidence."
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <article className="min-h-96 rounded-lg border border-white/10 bg-white/[0.035] p-7 shadow-insetGlow">
                  <div className="flex gap-1 text-electric">
                    {Array.from({ length: testimonial.rating }, (_, star) => (
                      <Star key={star} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-8 text-lg leading-8 text-smoke/78">"{testimonial.quote}"</p>
                  <div className="mt-10 border-t border-white/10 pt-5">
                    <p className="font-display text-xl font-black uppercase text-white">{testimonial.name}</p>
                    <p className="mt-1 text-sm font-semibold uppercase text-electric">{testimonial.company}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
