import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileDrawer({ setup }: { setup: any }) {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // Close drawer after scrolling
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>
        <Menu className="cursor-pointer" size={35} />
      </SheetTrigger>
      <SheetContent className="bg_color border-2 border-gray-700/50">
        {/* <SheetTitle>Menu</SheetTitle> */}

        <div className="pt-12">
          <ul className="flex flex-col gap-10 text-lg ml-1">
            <li
              onClick={() => scrollToSection("home")}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => scrollToSection("about")}
              className="cursor-pointer"
            >
              About Me
            </li>
            {setup.project && (
              <li
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer"
              >
                Projects
              </li>
            )}
            {setup.experience && (
              <li
                onClick={() => scrollToSection("experience")}
                className="cursor-pointer"
              >
                Experience
              </li>
            )}
            {setup.education && (
              <li
                onClick={() => scrollToSection("education")}
                className="cursor-pointer"
              >
                Education
              </li>
            )}
            {setup.skills && (
              <li
                onClick={() => scrollToSection("skills")}
                className="cursor-pointer"
              >
                Skills
              </li>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
