"use client";
import React, { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type User = {
  _id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  nextBilling: string;
  subscriptionState: string;
  hasAccess: boolean;
  currentstep: number;
  completed: boolean;
  profile: {
    username: string;
    displayName: string;
    about: string;
    tagline: string;
  };
};

const UserDetailsTable = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/admin-dashboard")
      .then((response) => {
        console.log("API Response:", response.data);
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data.users && Array.isArray(response.data.users)) {
          // If response.data has a users property that's an array
          setUsers(response.data.users);
        } else {
          // If response data is a single user object, wrap it in an array
          setUsers([response.data]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.error || error.message);
        setError(error.response?.data?.error || "Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "N/A") return "N/A";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Function to get subscription state styling
  const getSubscriptionStateStyle = (state: string) => {
    switch (state) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to handle view portfolio

  // Function to handle cancel subscription (non-functional for now)
  const handleCancelSubscription = (userId: string) => {
    console.log(`Cancellation requested for user ID: ${userId}`);
    alert("Subscription cancellation feature is not implemented yet.");
    // The actual API call will be implemented in a future step
  };

  if (loading) {
    return (
      <div className="main_margin">
        <div className="container p-10 bg-white rounded-lg shadow-md flex justify-center items-center">
          <p className="text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main_margin">
        <div className="container p-10 bg-white rounded-lg shadow-md">
          <div className="py-6 border-b border-gray-200">
            <h2 className="text-2xl">
              Admin Dashboard<span className="text-[--primary]">.</span>
            </h2>
          </div>
          <div className="text-red-500 p-4">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main_margin">
      <div className="container pb-10 bg-white rounded-lg shadow-md">
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-2xl">
            Admin Dashboard<span className="text-[--primary]">.</span>
          </h2>
          <p className="text-xl">Welcome, {session?.user?.name || "Admin"}!</p>
        </div>
        {users.length === 0 ? (
          <div className="p-6 text-center">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Join Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Next Billing
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.profile?.displayName || user.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.profile?.username || user.username || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.hasAccess ? (
                        <div className="text-sm text-gray-500">
                          {user.createdAt
                            ? (() => {
                                const date = new Date(user.createdAt);
                                date.setMonth(date.getMonth() + 1); // Increase month by 1
                                return date.toLocaleDateString(); // Format as per locale
                              })()
                            : "N/A"}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.hasAccess
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.hasAccess ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                          href={`/${user.profile.username}`}
                        >
                          <Eye size={16} className="mr-1" />
                          <span>View</span>
                        </a>

                        {user.subscriptionState === "Active" && (
                          <button
                            onClick={() =>
                              handleCancelSubscription(user.profile.username)
                            }
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsTable;
