import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquareMenu } from "lucide-react";
import Link from "next/link";
import navbarLinks from "../constants/navbar";
import { useSession } from "next-auth/react";

export default function MobileDrawer() {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger>
        <SquareMenu className="cursor-pointer" size={30} />
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetTitle>Menu</SheetTitle>

        <div className="pt-12">
          <ul className="flex flex-col gap-3 text-lg ml-1">
            {navbarLinks.map((link) => (
              <li key={link.id} className={`${session ? "last:hidden" : ""}`}>
                <Link href={`/${link.id}`}>{link.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/register">
            <button className="bg-black text-white rounded-full px-7 py-2 hover:bg-[--primary] hover:text-black mt-5">
              {session ? "Dashboard" : "Sign Up"}
            </button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
