import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteForm } from "@/components/sections/quote-form";
import { SectionHeading } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Quote Request",
  description:
    "Advanced Rasheed Repairs quote request form with validation, image uploads, urgency levels, WhatsApp and email integration."
};

export default async function QuoteRequestPage({
  searchParams
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const service = params.service ? decodeURIComponent(params.service) : "";

  return (
    <>
      <PageHero
        eyebrow="Quote request"
        title="Send a precise repair brief before the first call."
        copy="The form captures the fault, equipment type, province, urgency and photos so the repair intake starts with better information."
        image="/images/IMG-20260526-WA0022.jpg"
        badge="Advanced repair intake"
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Repair details"
            title="Tell Rasheed Repairs what failed, where it is, and how urgent it is."
          />
          <div className="mt-12">
            <QuoteForm initialService={service} />
          </div>
        </div>
      </section>
    </>
  );
}
