import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React from "react";

function HomeMap({ location }: { location: string }) {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className=" h-[50vh] w-full" />,
  });
  return <LazyMap location={location} />;
}

export default HomeMap;
