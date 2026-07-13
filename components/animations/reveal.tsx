"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "p" | "span";
};

export function Reveal({ children, className, delay = 0, as = "div", ...props }: RevealProps) {
  const Component = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    p: motion.p,
    span: motion.span
  }[as];

  return (
    <Component
      initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-3 gap-y-2", className)} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.72, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.98] text-white md:text-6xl">
          <SplitWords text={title} />
        </h2>
      </Reveal>
      {copy ? (
        <Reveal delay={0.16}>
          <p className={cn("mt-6 max-w-2xl text-base leading-7 text-smoke/75 md:text-lg", align === "center" && "mx-auto")}>
            {copy}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
