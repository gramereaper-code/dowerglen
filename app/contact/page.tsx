import type { Metadata } from "next";
import { ContactSurface } from "@/components/sections/contact-surface";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rasheed Repairs for nationwide commercial kitchen, refrigeration and appliance repair support."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start the repair intake and get your equipment assessed."
        copy="Use the quote form, WhatsApp link, call link or email link. Verified business contact details can be added through environment variables when supplied."
        image="/images/IMG-20260526-WA0025.jpg"
        badge="Nationwide intake"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Service contact"
            title="Commercial urgency, practical intake and South Africa coverage."
          />
          <div className="mt-12">
            <ContactSurface />
          </div>
        </div>
      </section>
    </>
  );
}
