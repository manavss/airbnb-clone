import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "./SubmitButtons";
import { addToFavourites, deleteFromFavourites } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  // pathName: string;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
  homeId,
  userId,
  isInFavoriteList,
  favoriteId, // pathName
}: iAppProps) {
  //cfonubxjkacgdmkympbx.supabase.co/storage/v1/object/public/images/romanian-guitar-tiny-house@2000x1500.jpg
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  https: return (
    <div className="flex flex-col">
      <div className=" relative h-72">
        <Image
          src={`https://cfonubxjkacgdmkympbx.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className=" rounded-lg h-full object-cover"
        />
        {userId && (
          <div className=" z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavourites}>
                <input type="hidden" name="favouriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />

                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourites}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
