"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";

const headline = ["PRECISION REPAIRS.", "COMMERCIAL POWER.", "NATIONWIDE SERVICE."];

export function HomeHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-54"
        src="/videos/VID-20260526-WA0029.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/IMG-20260526-WA0025.jpg"
        aria-label="Commercial kitchen repair footage"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/76 via-black/48 to-background" />
      <div className="absolute inset-0 bg-industrial-grid bg-[length:70px_70px] opacity-20" />
      <div className="noise" />
      <div className="hud-corner top-left" />
      <div className="hud-corner bottom-right" />

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 26 }, (_, index) => (
          <motion.span
            key={index}
            className="absolute size-1 rounded-full bg-electric/70 shadow-electric"
            style={{ left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%` }}
            animate={{ y: [0, -24, 0], opacity: [0.14, 0.86, 0.14] }}
            transition={{ duration: 4 + (index % 5), repeat: Infinity, delay: index * 0.08 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-end px-4 pb-14 pt-32 md:items-center md:pb-0">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold uppercase text-smoke/80 backdrop-blur-xl"
          >
            <Gauge size={16} className="text-electric" />
            Commercial kitchen systems calibrated for uptime
          </motion.div>

          <div className="max-w-6xl">
            <h1 className="font-display text-[clamp(3.2rem,10vw,9.4rem)] font-black uppercase leading-[0.86] text-white">
              {headline.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span
                    className="block"
                    initial={{ y: "110%", filter: "blur(16px)" }}
                    animate={{ y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.08, delay: 1.35 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-8 max-w-2xl text-lg leading-8 text-smoke/78 md:text-xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.95 }}
            >
              Trusted commercial kitchen and appliance repair specialists serving South Africa.
            </motion.p>
          </div>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 2.12 }}
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/quote-request">
                  Request a Quote
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services">
                  Explore Services
                  <ShieldCheck size={18} />
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
