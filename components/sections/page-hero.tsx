"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  copy,
  image = "/images/IMG-20260526-WA0025.jpg",
  badge
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  badge?: string;
}) {
  return (
    <section className="relative min-h-[68vh] overflow-hidden px-4 pb-20 pt-36">
      <Image src={image} alt="" fill priority className="object-cover opacity-28" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/78 to-background" />
      <div className="absolute inset-0 bg-industrial-grid bg-[length:72px_72px] opacity-20" />
      <div className="site-container relative z-10">
        {badge ? <Badge>{badge}</Badge> : null}
        <motion.p
          className="eyebrow mt-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-5 max-w-5xl font-display text-5xl font-black uppercase leading-[0.92] text-white md:text-8xl"
          initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.86, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-7 max-w-2xl text-lg leading-8 text-smoke/75"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.18 }}
        >
          {copy}
        </motion.p>
      </div>
    </section>
  );
}
