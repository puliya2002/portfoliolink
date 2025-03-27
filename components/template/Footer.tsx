
"use client";
export default function Footer({ setup }: { setup: any }) {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

    }
  };

  return (
    <div className="pt-12">
      <hr className="border-gray-600/50" />
      <ul className="flex flex-wrap justify-center items-center gap-8 text-lg ml-1 p-10 opacity-55">
        <li onClick={() => scrollToSection("home")} className="cursor-pointer">
          Home
        </li>
        <li onClick={() => scrollToSection("about")} className="cursor-pointer">
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
  );    

}
