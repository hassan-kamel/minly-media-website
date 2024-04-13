import { Skeleton } from "@/components/ui/skeleton";
import { forwardRef } from "react";

export const SkeletonCard = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex flex-col mx-auto my-3 space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[700px]" />
      </div>
      <Skeleton className="h-[300px] w-[700px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-[700px]" />
      </div>
    </div>
  );
});
