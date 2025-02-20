
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "../constants/navbar";
import Drawer from "./Drawer";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {


  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 main_margin z-50">
      <div className="flex items-center justify-between container mx-auto bg-white rounded-full my-4 px-8 py-4">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={250}
              height={250}
              style={{ width: "auto", height: "35px" }}
            ></Image>
          </Link>
        </div>

        <div>
          <ul className="flex gap-6 items-center text-md hidden md:flex ">
            {!pathname.includes("/dashboard") && (
              <ul className="flex gap-6 items-center text-md hidden md:flex">
                {NavbarLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`cursor-pointer hover:border-b hover:border-b-black${
                      session ? " last:hidden" : ""
                    }`}
                  >
                    <Link href={`/${link.id}`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/register">
              <button className="bg-black text-white rounded-full px-7 py-2 hover:bg-[--primary] hover:text-black">
                {session ? "Dashboard" : "Sign Up"}
              </button>
            </Link>
            {pathname.includes("/dashboard") && session && (
              <button className="text-md" onClick={() => signOut()}>
                Logout
              </button>
            )}
          </ul>

          <div className="md:hidden pt-1">
            <Drawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
