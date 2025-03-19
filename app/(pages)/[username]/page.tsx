"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultTemplate from "@/app/template/default/page";

const UserPage = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [social, setSocial] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.username}`
        );
        setUser(res.data.user);
        setStats(res.data.stats || []);
        setSocial(res.data.social || {});
      } catch (err) {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <DefaultTemplate user={user} stats={stats} social={social} />
    </div>
  );
};

export default UserPage;
