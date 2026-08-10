import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
}) {
  const max = size === "narrow" ? "max-w-[1126px]" : size === "wide" ? "max-w-[1600px]" : "max-w-[1400px]";
  return (
    <div className={cn("box-content mx-auto w-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10", max, className)}>
      {children}
    </div>
  );
}
