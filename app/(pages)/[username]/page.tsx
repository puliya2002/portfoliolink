// app/users/[username]/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the types for the user data
interface User {
  username: string;
  email: string;
}

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserPage;
