import { Button } from "@/components/ui/button";
import Image from "next/image";
import FilterBar from "./components/FilterBar";
import prisma from "./lib/db";
import ListingCard from "./components/ListingCard";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "./components/SkeletonCard";
import NoItems from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    address?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      address: searchParams?.address ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      address: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}
export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    address?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <FilterBar />
      <Suspense fallback={<SkeletonLoading />} key={searchParams?.filter}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    address?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <>
          <NoItems
            title="Sorry no listings for this category found "
            description="Please check a other category or create your own listing!"
          />
        </>
      ) : (
        <div className=" grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 mb-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.address as string}
              price={item.price as number}
              homeId={item.id}
              userId={user?.id}
              favoriteId={item.Favourite[0]?.id}
              isInFavoriteList={item.Favourite.length > 0 ? true : false}
              // pathName={searchParams}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className=" grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
