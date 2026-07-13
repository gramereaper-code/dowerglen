import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-pad grid min-h-[70vh] place-items-center text-center">
      <div className="max-w-2xl">
        <p className="eyebrow">System route unavailable</p>
        <h1 className="mt-4 font-display text-5xl font-black uppercase text-white md:text-7xl">Page not found</h1>
        <p className="mt-5 text-smoke/70">The page you opened is not part of the Rasheed Repairs service interface.</p>
        <Button asChild className="mt-8">
          <Link href="/home">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
