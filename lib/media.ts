export type SiteImage = {
  src: string;
  alt: string;
  category: "restaurant equipment" | "commercial repairs" | "household appliances" | "installations" | "refrigeration";
  source: "local" | "internet";
};

export const localImages: SiteImage[] = [
  {
    src: "/images/IMG-20260526-WA0025.jpg",
    alt: "Technician working inside a stainless steel fryer electrical bay",
    category: "commercial repairs",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0021.jpg",
    alt: "Commercial fryer bank with stainless steel baskets and controls",
    category: "restaurant equipment",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0014.jpg",
    alt: "Bright commercial refrigeration cabinet interior",
    category: "refrigeration",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0022.jpg",
    alt: "Commercial kitchen machine panel and wiring inspection",
    category: "commercial repairs",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0024.jpg",
    alt: "Technician service view of restaurant equipment",
    category: "restaurant equipment",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0023.jpg",
    alt: "Commercial appliance close-up during maintenance",
    category: "installations",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0018.jpg",
    alt: "Commercial kitchen equipment prepared for diagnostics",
    category: "household appliances",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0019.jpg",
    alt: "Repair detail showing appliance hardware and surfaces",
    category: "commercial repairs",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0015.jpg",
    alt: "Refrigeration unit and service detail",
    category: "refrigeration",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0016.jpg",
    alt: "Industrial kitchen equipment inspection detail",
    category: "commercial repairs",
    source: "local"
  },
  {
    src: "/images/IMG-20260526-WA0020.jpg",
    alt: "Commercial equipment repair site documentation",
    category: "restaurant equipment",
    source: "local"
  }
];

export const internetImages: SiteImage[] = [
  {
    src: "https://images.pexels.com/photos/32391499/pexels-photo-32391499.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Royalty-free repair technicians fixing an industrial freezer",
    category: "refrigeration",
    source: "internet"
  },
  {
    src: "https://images.pexels.com/photos/5325671/pexels-photo-5325671.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Royalty-free cinematic industrial machinery interior",
    category: "installations",
    source: "internet"
  },
  {
    src: "https://images.unsplash.com/photo-1739821349141-9ce12fff39a3?auto=format&fit=crop&w=1600&q=80",
    alt: "Royalty-free industrial machine close-up with cool lighting",
    category: "commercial repairs",
    source: "internet"
  }
];

export const galleryImages = [...localImages, ...internetImages];

export const videos = [
  {
    src: "/videos/VID-20260526-WA0029.mp4",
    title: "Commercial Equipment Service",
    detail: "Local repair footage from the Rasheed Repairs media folder"
  },
  {
    src: "/videos/VID-20260526-WA0030.mp4",
    title: "Workshop Diagnostic Clip",
    detail: "Local video showing real equipment inspection context"
  },
  {
    src: "/videos/VID-20260526-WA0028.mp4",
    title: "On-site Repair Motion",
    detail: "Short local service clip for the video gallery"
  },
  {
    src: "/videos/VID-20260526-WA0026.mp4",
    title: "Electrical Repair Detail",
    detail: "Local mobile footage from an equipment service call"
  },
  {
    src: "/videos/VID-20260526-WA0027.mp4",
    title: "Fast Diagnostic Pass",
    detail: "Local clip prepared for preview playback"
  }
];
