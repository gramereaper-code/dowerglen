import {
  Bolt,
  Building2,
  Flame,
  Gauge,
  IceCreamBowl,
  LucideIcon,
  MapPinned,
  Microwave,
  PlugZap,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wrench
} from "lucide-react";

export const SITE = {
  name: "Rasheed Repairs",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasheed-repairs.onrender.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  location: "Nationwide South Africa service coverage",
  contactPendingLabel: "Verified business contact pending"
};

export const navItems = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/clients", label: "Clients" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" }
];

export type Service = {
  title: string;
  slug: string;
  icon: LucideIcon;
  summary: string;
  breakdown: string[];
  image: string;
};

export const services: Service[] = [
  {
    title: "Commercial Kitchen Repairs",
    slug: "commercial-kitchen-repairs",
    icon: Building2,
    summary: "Restaurant-grade repair support for high-output kitchens, prep lines, warmers, ovens and stainless systems.",
    breakdown: ["Fault isolation", "Parts assessment", "Operational testing", "Site handover"],
    image: "/images/IMG-20260526-WA0021.jpg"
  },
  {
    title: "Grill Repairs",
    slug: "grill-repairs",
    icon: Flame,
    summary: "Diagnostics and repair flow for grills, hot plates and heat-control assemblies in fast-service environments.",
    breakdown: ["Temperature checks", "Element inspection", "Control calibration", "Safety verification"],
    image: "/images/IMG-20260526-WA0024.jpg"
  },
  {
    title: "Fryer Repairs",
    slug: "fryer-repairs",
    icon: Gauge,
    summary: "Electrical and mechanical fryer service for commercial fry stations where downtime is not an option.",
    breakdown: ["Thermostat testing", "Element continuity", "Wiring repair", "Load test"],
    image: "/images/IMG-20260526-WA0025.jpg"
  },
  {
    title: "Cold Room Systems",
    slug: "cold-room-systems",
    icon: Snowflake,
    summary: "Inspection and support for cold rooms, display fridges, upright chillers and commercial refrigeration zones.",
    breakdown: ["Temperature profiling", "Leak indicators", "Door seal review", "Performance validation"],
    image: "/images/IMG-20260526-WA0014.jpg"
  },
  {
    title: "Refrigeration Systems",
    slug: "refrigeration-systems",
    icon: IceCreamBowl,
    summary: "Service coverage for food-safe refrigeration systems used in kitchens, retail and hospitality sites.",
    breakdown: ["Airflow checks", "Compressor review", "Thermostat diagnostics", "Food safety readiness"],
    image: "https://images.pexels.com/photos/32391499/pexels-photo-32391499.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Microwave Repairs",
    slug: "microwave-repairs",
    icon: Microwave,
    summary: "Repair support for domestic and commercial microwave faults with a safety-first diagnostic process.",
    breakdown: ["Power issue checks", "Door switch testing", "Heat fault isolation", "Safety checks"],
    image: "/images/IMG-20260526-WA0018.jpg"
  },
  {
    title: "Washing Machines",
    slug: "washing-machines",
    icon: Sparkles,
    summary: "Household appliance diagnostics for wash cycles, drainage faults, noise issues and control problems.",
    breakdown: ["Cycle testing", "Pump inspection", "Belt and motor review", "Final run test"],
    image: "/images/IMG-20260526-WA0019.jpg"
  },
  {
    title: "Stove Repairs",
    slug: "stove-repairs",
    icon: PlugZap,
    summary: "Stove, hob and oven fault finding for homes, restaurants and catering operations.",
    breakdown: ["Element testing", "Switch review", "Wiring checks", "Heat stability test"],
    image: "/images/IMG-20260526-WA0020.jpg"
  },
  {
    title: "Commercial Electrical Faults",
    slug: "commercial-electrical-faults",
    icon: Bolt,
    summary: "Electrical kitchen system diagnostics focused on safety, continuity and uptime.",
    breakdown: ["Circuit tracing", "Breaker review", "Load testing", "Repair documentation"],
    image: "/images/IMG-20260526-WA0022.jpg"
  },
  {
    title: "Preventative Maintenance",
    slug: "preventative-maintenance",
    icon: ShieldCheck,
    summary: "Scheduled inspections and service planning for restaurants, franchises and multi-site operators.",
    breakdown: ["Asset checks", "Priority reporting", "Maintenance intervals", "Downtime planning"],
    image: "https://images.unsplash.com/photo-1739821349141-9ce12fff39a3?auto=format&fit=crop&w=1400&q=80"
  }
];

export const metrics = [
  { label: "Years Experience", value: 20, suffix: "+" },
  { label: "Repairs Completed", value: 4800, suffix: "+" },
  { label: "Commercial Clients", value: 120, suffix: "+" },
  { label: "Provinces Served", value: 9, suffix: "" }
];

export const clientMarks = ["RocoMamas", "Mugg & Bean", "SPAR", "Chicken Licken"];

export const processSteps = [
  "Rapid fault intake",
  "On-site diagnostic scan",
  "Transparent repair plan",
  "Parts and safety check",
  "Operational test and sign-off"
];

export const testimonials = [
  {
    name: "Franchise Operations Manager",
    company: "Fast-food group",
    quote:
      "Rasheed Repairs handles urgent fryer and warm-line faults with calm precision. The communication is clear and the equipment is tested before handover.",
    rating: 5
  },
  {
    name: "Kitchen Supervisor",
    company: "Restaurant kitchen",
    quote:
      "The repair process feels professional from first call to final test. The technician understands pressure kitchens and keeps downtime under control.",
    rating: 5
  },
  {
    name: "Retail Store Owner",
    company: "Food retail",
    quote:
      "Our refrigeration issues were assessed quickly and explained in plain language. That level of care makes it easier to plan repairs.",
    rating: 5
  }
];

export const timeline = [
  {
    year: "Foundation",
    title: "Hands-on technical mastery",
    text: "Rasheed Repairs grew from direct field experience across refrigeration, cooking lines and appliance systems."
  },
  {
    year: "Expansion",
    title: "Commercial kitchen specialization",
    text: "The service evolved around restaurant-grade equipment, high-pressure service calls and repeat franchise environments."
  },
  {
    year: "Nationwide",
    title: "South Africa coverage",
    text: "Support is structured for operators across provinces with a practical intake, diagnostic and repair handover process."
  }
];

export const provinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape"
];

export const contactCards = [
  {
    title: "Nationwide Service",
    detail: "Commercial and household repair support across South Africa.",
    icon: MapPinned
  },
  {
    title: "Emergency Readiness",
    detail: "Priority intake for equipment downtime and service-critical faults.",
    icon: Gauge
  },
  {
    title: "Technical Diagnostics",
    detail: "Electrical, refrigeration and kitchen system fault finding.",
    icon: Wrench
  }
];
