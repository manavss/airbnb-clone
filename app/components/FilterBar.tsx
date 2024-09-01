"use client";
import Link from "next/link";
import { categoryItems } from "../lib/catergories";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export default function FilterBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  //   console.log(search);
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"
          )}
          href={pathname + "?" + createQueryString("filter", item.name)}
          key={item.id}
        >
          <div className=" relative w-6 h-6">
            <Image
              width={24}
              height={24}
              src={item.imageUrl}
              alt="category"
              className=" h-6 w-6"
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
