"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE, contactCards, provinces } from "@/lib/site";

export function ContactSurface() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="grid gap-5">
        {contactCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-insetGlow"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div className="grid size-12 place-items-center rounded-full border border-electric/40 bg-electric/12 text-electric shadow-electric">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-smoke/68">{card.detail}</p>
            </motion.article>
          );
        })}

        <div className="rounded-lg border border-white/10 bg-radial-reactor p-6 shadow-insetGlow">
          <p className="eyebrow">Direct links</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href={SITE.phone ? `tel:${SITE.phone}` : "#"} aria-disabled={!SITE.phone}>
                <Phone size={17} />
                {SITE.phone || "Phone pending"}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={SITE.email ? `mailto:${SITE.email}` : "mailto:"}>
                <Mail size={17} />
                {SITE.email || "Email pending"}
              </a>
            </Button>
            <Button asChild>
              <Link href="/quote-request">
                Quote Form
                <ArrowUpRight size={17} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[620px] overflow-hidden rounded-lg border border-white/10 bg-[#050808] p-6 shadow-insetGlow">
        <div className="absolute inset-0 bg-industrial-grid bg-[length:58px_58px] opacity-25" />
        <div className="absolute inset-0 bg-radial-reactor opacity-60" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="eyebrow">Interactive service area map</p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase text-white md:text-6xl">South Africa Coverage</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/70">
              The map-style interface shows nationwide availability. Exact callout locations and response windows can be refined with confirmed business operations details.
            </p>
          </div>

          <div className="relative mx-auto my-10 grid aspect-square w-full max-w-[520px] place-items-center rounded-full border border-electric/18 bg-black/30">
            <div className="absolute inset-10 rounded-full border border-reactor/20" />
            <div className="absolute inset-24 rounded-full border border-white/10" />
            {provinces.map((province, index) => {
              const angle = (index / provinces.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return (
                <motion.div
                  key={province}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/30 bg-background/85 px-3 py-2 text-[11px] font-bold uppercase text-smoke backdrop-blur"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ y: [0, -5, 0], opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.16 }}
                >
                  {province}
                </motion.div>
              );
            })}
            <div className="grid size-32 place-items-center rounded-full border border-electric/40 bg-electric/12 text-center shadow-electric">
              <span className="font-display text-lg font-black uppercase text-white">Rasheed<br />Repairs</span>
            </div>
          </div>

          <Button asChild size="lg" className="w-full justify-center">
            <a href={SITE.whatsapp ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}` : "https://wa.me/"} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              Open WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
