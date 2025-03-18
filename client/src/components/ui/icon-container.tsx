import * as React from "react";
import { cn } from "@/lib/utils";

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "blue" | "light-blue" | "orange";
}

const colorVariants = {
  blue: "bg-[#009FDB]",
  "light-blue": "bg-[#00A8E0]",
  orange: "bg-[#F37B21]",
};

export function IconContainer({
  className,
  color = "blue",
  children,
  ...props
}: IconContainerProps) {
  return (
    <div
      className={cn(
        "h-48 flex items-center justify-center",
        colorVariants[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
