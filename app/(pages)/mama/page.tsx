"use client"; // Use this only in App Router

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
}

const UsernamesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/api/users"); // Explicitly using User[]
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usernames</h1>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="p-3 border rounded shadow-md">
            <p className="font-semibold">Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsernamesPage;
