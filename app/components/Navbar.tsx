import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";
export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-4">
        <Link href="/">
          <Image
            className="w-32 hidden lg:block"
            src={DesktopLogo}
            alt="airbnb-logo"
          />
          <Image
            className="block w-12 lg:hidden"
            src={MobileLogo}
            alt="airbnb-logo"
          />
        </Link>

        <SearchComponent />

        <UserNav />
      </div>
    </nav>
  );
}
