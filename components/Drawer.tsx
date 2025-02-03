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

export default function MobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger><SquareMenu className="cursor-pointer" size={30} /></SheetTrigger>
          <SheetContent className="bg-white">
              <SheetTitle>Menu</SheetTitle>

              <div className="pt-12">
                  <ul className="flex flex-col gap-3 text-lg">
                      {navbarLinks.map((link) => (
                          <li key={link.id}>
                              <Link href={`/${link.id}`}>{link.title}</Link>
                          </li>
                      ))}
                  </ul> 
              </div>

      </SheetContent>
    </Sheet>
  );
}
