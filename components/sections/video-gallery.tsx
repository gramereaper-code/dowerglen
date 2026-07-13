"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videos } from "@/lib/media";

export function VideoGallery() {
  const [active, setActive] = useState<(typeof videos)[number] | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video, index) => (
          <motion.button
            key={video.src}
            type="button"
            onClick={() => setActive(video)}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left shadow-insetGlow"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
          >
            <div className="relative aspect-video overflow-hidden">
              <video src={video.src} muted playsInline preload="metadata" className="h-full w-full object-cover opacity-72 transition group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
              <div className="absolute left-5 top-5 grid size-12 place-items-center rounded-full border border-electric/45 bg-electric/16 text-electric shadow-electric">
                <Play size={20} fill="currentColor" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow">Local video</p>
                <h3 className="mt-2 font-display text-xl font-black uppercase text-white">{video.title}</h3>
                <p className="mt-2 text-sm text-smoke/62">{video.detail}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/88 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
          <div className="relative w-[min(1080px,94vw)] overflow-hidden rounded-lg border border-white/14 bg-background">
            <video src={active.src} controls autoPlay className="aspect-video w-full bg-black object-contain" />
            <Button variant="secondary" size="icon" className="absolute right-4 top-4" onClick={() => setActive(null)} aria-label="Close video">
              <X size={18} />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
