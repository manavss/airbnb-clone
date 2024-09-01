/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, MenuIcon, UserIcon } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createHome } from "../actions";
export default async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // console.log(user);

  const createHomeWithId = createHome.bind(null, {
    userId: user?.id as string,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <div className=" hover:shadow-md rounded-full border p-2 lg:px-3 lg:py-2 flex items-center gap-x-2 ">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            className=" rounded-full hidden lg:block lg:w-8 lg:h-8"
            src={
              user?.picture ??
              "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
            }
            alt="Profile Picture"
          />
          {/* <CircleUserRound /> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] py-2">
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={createHomeWithId} className="w-full">
                <button className="w-full text-start" type="submit">
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-homes">My listings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favourites">My favourites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/reservations">My reservations</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutLink className="text-red-600">Log out</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="font-semibold">Sign up</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink>Log in</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
