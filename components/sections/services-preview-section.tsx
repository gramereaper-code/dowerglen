"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site";

function TiltServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = service.icon;

  return (
    <motion.article
      className="group relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-insetGlow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.64, delay: index * 0.04 }}
      style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 7, y: y * -7 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <Image src={service.image} alt={service.title} fill className="object-cover opacity-52 transition duration-700 group-hover:scale-105 group-hover:opacity-72" sizes="(min-width:1024px) 33vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/46 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6">
        <div className="grid size-12 place-items-center rounded-full border border-electric/40 bg-electric/12 text-electric shadow-electric">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="font-display text-2xl font-black uppercase text-white">{service.title}</h3>
          <p className="mt-4 text-sm leading-7 text-smoke/72">{service.summary}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesPreviewSection() {
  const preview = services.slice(0, 7);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="site-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Service matrix"
            title="Repairs for the equipment your operation depends on."
            copy="From fast-food fry stations to cold storage and household appliances, the service range is built around fault finding, repair and preventative care."
          />
          <Button asChild variant="secondary">
            <Link href="/services">
              View Full Services
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {preview.map((service, index) => (
            <TiltServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
