import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-electric/35 bg-electric/10 px-3 py-1 text-xs font-bold uppercase text-electric",
        className
      )}
    >
      {children}
    </span>
  );
}
