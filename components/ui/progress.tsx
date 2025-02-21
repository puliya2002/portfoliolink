"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className="relative">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-900 border-2 border-gray-900",
        className
      )}
      {...props}
    >
      <p className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-xs pr-3 z-10">
        {value}% completed{" "}
      </p>
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-[--primary] transition-all rounded-full "
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
