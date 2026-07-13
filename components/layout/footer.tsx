import Link from "next/link";
import { ArrowUpRight, Mail, MapPinned, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, navItems, services } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030303] px-4 py-16">
      <div className="absolute inset-0 bg-industrial-grid bg-[length:64px_64px] opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-reactor opacity-45" aria-hidden="true" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-3xl font-black uppercase text-white">Rasheed Repairs</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-smoke/68">
            Premium commercial kitchen, refrigeration, electrical and appliance repair support across South Africa.
          </p>
          <Button asChild className="mt-7">
            <Link href="/quote-request">
              Get a Fast Quote
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase text-white">Quick Links</p>
          <div className="grid gap-3 text-sm text-smoke/65">
            {navItems.slice(0, 7).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-electric">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase text-white">Services</p>
          <div className="grid gap-3 text-sm text-smoke/65">
            {services.slice(0, 7).map((service) => (
              <Link key={service.slug} href="/services" className="transition hover:text-electric">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase text-white">Business Info</p>
          <div className="grid gap-4 text-sm text-smoke/68">
            <span className="flex items-center gap-3">
              <MapPinned size={17} className="text-electric" />
              {SITE.location}
            </span>
            <span className="flex items-center gap-3">
              <Phone size={17} className="text-electric" />
              {SITE.phone || SITE.contactPendingLabel}
            </span>
            <span className="flex items-center gap-3">
              <Mail size={17} className="text-electric" />
              {SITE.email || SITE.contactPendingLabel}
            </span>
          </div>
          <p className="mt-8 text-xs uppercase text-smoke/42">© {year} Rasheed Repairs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
