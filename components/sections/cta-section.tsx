"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";

export function CtaSection() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden px-4 py-28">
      <div className="absolute inset-0 bg-[url('/images/IMG-20260526-WA0025.jpg')] bg-cover bg-center opacity-26" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/72 to-background" />
      <div className="fog-layer absolute inset-x-0 bottom-0 h-1/2" />
      <div className="absolute inset-0 bg-industrial-grid bg-[length:88px_88px] opacity-20" />

      <div className="site-container relative z-10 grid min-h-[52vh] place-items-center text-center">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Priority repair intake
          </motion.p>
          <motion.h2
            className="mt-5 max-w-5xl font-display text-5xl font-black uppercase leading-[0.94] text-white md:text-8xl"
            initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Your Equipment Downtime Ends Here.
          </motion.h2>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Rasheed
                  <MessageCircle size={18} />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary">
                <Link href="/quote-request">
                  Get a Fast Quote
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
