"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryImages, type SiteImage } from "@/lib/media";
import { cn } from "@/lib/utils";

const categories = ["all", "restaurant equipment", "commercial repairs", "household appliances", "installations", "refrigeration"] as const;

export function FilterableGallery({ mode = "gallery" }: { mode?: "gallery" | "portfolio" }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("all");
  const [selected, setSelected] = useState<SiteImage | null>(null);

  const filtered = useMemo(
    () => (activeCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === activeCategory)),
    [activeCategory]
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase transition",
              activeCategory === category
                ? "border-electric bg-electric text-black shadow-electric"
                : "border-white/12 bg-white/[0.04] text-smoke/68 hover:border-electric/55 hover:text-white"
            )}
          >
            <SlidersHorizontal size={14} />
            {category}
          </button>
        ))}
      </div>

      <div className={cn("mt-10 columns-1 gap-5 md:columns-2 xl:columns-3", mode === "portfolio" && "xl:columns-4")}>
        {filtered.map((image, index) => (
          <motion.button
            type="button"
            key={`${image.src}-${image.category}`}
            onClick={() => setSelected(image)}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left shadow-insetGlow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: Math.min(index * 0.04, 0.28) }}
          >
            <div className={cn("relative", index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[16/11]" : "aspect-square")}>
              <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-transparent to-black/12 opacity-80 transition group-hover:opacity-100" />
              <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/12 bg-black/48 text-white backdrop-blur-md">
                <Maximize2 size={16} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow">{image.source === "local" ? "Local folder media" : "Internet visual"}</p>
                <h3 className="mt-2 font-display text-xl font-black uppercase text-white">{image.category}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/88 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen gallery preview"
          onClick={() => setSelected(null)}
        >
          <div className="relative h-[86vh] w-[min(1100px,94vw)] overflow-hidden rounded-lg border border-white/14 bg-background">
            <Image src={selected.src} alt={selected.alt} fill className="object-contain" sizes="94vw" />
            <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/60 px-4 py-2 text-xs font-bold uppercase text-white backdrop-blur-md">
              {selected.category}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4"
              onClick={(event) => {
                event.stopPropagation();
                setSelected(null);
              }}
              aria-label="Close preview"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
