"use client";
import React, { useState } from "react";
import { Eye, X } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  joinDate: string;
  nextBilling: string;
  subscriptionState: "Active" | "Inactive" | "Pending" | "Expired";
};

const UserDetailsTable = () => {
     const [users, setUsers] = useState<User[]>([
       {
         id: "1",
         name: "John Doe",
         email: "john.doe@example.com",
         username: "johndoe",
         joinDate: "2023-03-15",
         nextBilling: "2025-06-15",
         subscriptionState: "Active",
       },
       {
         id: "2",
         name: "Jane Smith",
         email: "jane.smith@example.com",
         username: "janesmith",
         joinDate: "2023-08-22",
         nextBilling: "2025-05-22",
         subscriptionState: "Active",
       },
       {
         id: "3",
         name: "Robert Johnson",
         email: "robert.johnson@example.com",
         username: "robertj",
         joinDate: "2024-01-10",
         nextBilling: "2025-07-10",
         subscriptionState: "Pending",
       },
       {
         id: "4",
         name: "Emily Davis",
         email: "emily.davis@example.com",
         username: "emilyd",
         joinDate: "2022-11-05",
         nextBilling: "N/A",
         subscriptionState: "Expired",
       },
       {
         id: "5",
         name: "Michael Wilson",
         email: "michael.wilson@example.com",
         username: "michaelw",
         joinDate: "2024-02-28",
         nextBilling: "2025-05-28",
         subscriptionState: "Active",
       },
       {
         id: "6",
         name: "Sarah Brown",
         email: "sarah.brown@example.com",
         username: "sarahb",
         joinDate: "2023-07-19",
         nextBilling: "N/A",
         subscriptionState: "Inactive",
       },
       {
         id: "7",
         name: "David Miller",
         email: "david.miller@example.com",
         username: "davidm",
         joinDate: "2023-09-30",
         nextBilling: "2025-06-30",
         subscriptionState: "Active",
       },
     ]);

     // Function to format date
     const formatDate = (dateString: string) => {
       if (dateString === "N/A") return "N/A";

       const date = new Date(dateString);
       return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
       });
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
     const handleViewPortfolio = (userId: string) => {
       console.log(`Viewing portfolio for user ID: ${userId}`);
       // Implementation would go here
     };

     // Function to handle cancel subscription
     const handleCancelSubscription = (userId: string) => {
       console.log(`Cancelling subscription for user ID: ${userId}`);
       // In a real app, you'd likely show a confirmation modal first
       setUsers(
         users.map((user) =>
           user.id === userId
             ? { ...user, subscriptionState: "Inactive", nextBilling: "N/A" }
             : user
         )
       );
     };
    return (
      <div className="main_margin">
        <div className="container pb-10 bg-white rounded-lg shadow-md">
          <div className="py-6 border-b border-gray-200">
            <h2 className="text-2xl">
              Admin Dashboard<span className="text-[--primary]">.</span>
            </h2>
            <p className="text-xl">Welcome, Admin!!</p>
          </div>
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
                    Portfolio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(user.joinDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(user.nextBilling)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubscriptionStateStyle(
                          user.subscriptionState
                        )}`}
                      >
                        {user.subscriptionState}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewPortfolio(user.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Eye size={16} className="mr-1" />
                          <span>View</span>
                        </button>
                        {user.subscriptionState === "Active" && (
                          <button
                            onClick={() => handleCancelSubscription(user.id)}
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
        </div>
      </div>
    );
    
};

export default UserDetailsTable;
