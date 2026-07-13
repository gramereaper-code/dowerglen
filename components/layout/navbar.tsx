"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 18);
      setHidden(current > lastY && current > 160);
      lastY = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const quote = (
    <Button asChild size="default" className="hidden lg:inline-flex">
      <Link href="/quote-request">
        <Zap size={16} />
        Request Quote
      </Link>
    </Button>
  );

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled ? "border-b border-white/10 bg-background/70 shadow-[0_18px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl" : "bg-transparent"
      )}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto flex h-20 w-[min(1500px,calc(100vw-1.5rem))] items-center justify-between">
        <Link href="/home" className="group flex items-center gap-3" aria-label="Rasheed Repairs home">
          <span className="grid size-11 place-items-center rounded-full border border-electric/40 bg-electric/10 shadow-electric">
            <Zap size={20} className="text-electric" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-black uppercase text-white">Rasheed</span>
            <span className="block text-xs font-bold uppercase text-smoke/60">Repairs</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-full px-3 py-2 text-sm font-semibold uppercase text-smoke/68 transition hover:text-white",
                  active && "text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-electric transition group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {SITE.phone ? (
            <Button asChild variant="secondary" size="icon" aria-label="Call Rasheed Repairs">
              <a href={`tel:${SITE.phone}`}>
                <Phone size={18} />
              </a>
            </Button>
          ) : null}
          {quote}
          <Button
            variant="secondary"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="xl:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32 }}
          >
            <div className="mx-3 mb-3 rounded-2xl border border-white/10 bg-background/92 p-4 backdrop-blur-2xl">
              <div className="grid gap-2">
                {[...navItems, { href: "/quote-request", label: "Quote Request" }].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 font-display text-lg font-bold uppercase text-smoke transition hover:border-electric/40 hover:text-white",
                      pathname === item.href && "border-electric/50 text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
