"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";


const MainSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialGithub, setSocialGithub] = useState("");

  const [stat1Title, setStat1Title] = useState("");
  const [stat1Value, setStat1Value] = useState("");
  const [stat2Title, setStat2Title] = useState("");
  const [stat2Value, setStat2Value] = useState("");
  const [stat3Title, setStat3Title] = useState("");
  const [stat3Value, setStat3Value] = useState("");

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/step4");
        console.log("Fetched data:", response.data);

        const { profile, social, stats } = response.data;

        setDisplayName(profile.displayName || "");
        setTagline(profile.tagline || "");
        setAbout(profile.about || "");
        setSocialFacebook(social.facebook);
        setSocialInstagram(social.instagram);
        setSocialLinkedin(social.linkedin);
        setSocialGithub(social.github);

        setStat1Title(stats[0].title);
        setStat1Value(stats[0].value);
        setStat2Title(stats[1].title);
        setStat2Value(stats[1].value);
        setStat3Title(stats[2].title);
        setStat3Value(stats[2].value);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Move API call to a function that is triggered manually, not on state change
  const handleSave = async () => {
    try {
      const res = await axios.post("/api/step4", {
        displayName,
        tagline,
        about,
        socialFacebook,
        socialInstagram,
        socialLinkedin,
        socialGithub,
        stats: [
          { title: stat1Title, value: stat1Value },
          { title: stat2Title, value: stat2Value },
          { title: stat3Title, value: stat3Value },
        ],
      });
      console.log("Data saved successfully:", res.data);
    } catch (err: any) {
      console.error("Error:", err.response?.data?.error);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5 ">
      <div className="">
        <h1 className="text-xl font-semibold">Main Section & About</h1>
        <div className="flex justify-end">
          <div className="flex gap-1  px-4 py-1 rounded-full ">
            {!edit && <Pencil className="w-5 h-5" />}
            <button onClick={() => setEdit(!edit)}>
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
        <form>
          {/* Personal Information start*/}

          {edit && (
            <div>
              <hr className="mb-3" />
              <div className="flex justify-end">
                <button
                  className="bg-[--primary] px-4 py-1 rounded-full "
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
              <div>
                <TextField
                  label="Full Name"
                  placeholder="e.g., John Doe"
                  value={displayName}
                  onChange={(e: any) => setDisplayName(e.target.value)}
                />
                <TextField
                  label="Tagline"
                  placeholder="e.g., Web Developer | UI/UX Designer | Graphic Designer"
                  value={tagline}
                  onChange={(e: any) => setTagline(e.target.value)}
                />

                <div className="pt-2">
                  <label>Social Media Links</label>
                  <div className="pl-5">
                    <TextField
                      placeholder="Facebook"
                      value={socialFacebook}
                      onChange={(e: any) => setSocialFacebook(e.target.value)}
                    />
                    <TextField
                      placeholder="Instagram "
                      value={socialInstagram}
                      onChange={(e: any) => setSocialInstagram(e.target.value)}
                    />
                    <TextField
                      placeholder="Linkedin "
                      value={socialLinkedin}
                      onChange={(e: any) => setSocialLinkedin(e.target.value)}
                    />
                    <TextField
                      placeholder="Github "
                      value={socialGithub}
                      onChange={(e: any) => setSocialGithub(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 text-[13px]">{error}</p>}
              {/* Personal Information end*/}

              {/* Custom Statistics start*/}
              <h1 className="text-xl font-normal py-3 mt-14">
                Custom Statistics
              </h1>
              <hr className="mb-3" />

              <div>
                <div className="pt-2">
                  <label>Statistic 1</label>
                  <div className="flex flex-row gap-2">
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., Years of Experience"
                        value={stat1Title}
                        onChange={(e: any) => setStat1Title(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., 5++"
                        value={stat1Value}
                        onChange={(e: any) => setStat1Value(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <label>Statistic 2</label>
                  <div className="flex flex-row gap-2">
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., Projects Completed"
                        value={stat2Title}
                        onChange={(e: any) => setStat2Title(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., 10+"
                        value={stat2Value}
                        onChange={(e: any) => setStat2Value(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <label>Statistic 3</label>
                  <div className="flex flex-row gap-2">
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., Clients Served"
                        value={stat3Title}
                        onChange={(e: any) => setStat3Title(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextField
                        placeholder="e.g., 25++"
                        value={stat3Value}
                        onChange={(e: any) => setStat3Value(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Custom Statistics end*/}

              {/* About me start*/}
              <h1 className="text-xl font-normal py-3 mt-14">About Me</h1>
              <hr className="mb-3" />
              <textarea
                className="form_input h-32 bg-gray-50"
                placeholder="Write a brief bio for your 'About Me' section."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MainSection;
