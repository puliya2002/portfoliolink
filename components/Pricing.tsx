"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gw9CZfLvfnn5I4dQR"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1NfNc0F2kVprice_1R7swtCROFDtLkqB4FJqcAhu"
        : "",
    price: 19,
    duration: "/month",
  },
];

function Pricing() {
  const { data: session, status } = useSession();

  const [plan, setPlan] = useState(plans[0]);
  return (
    <div className="main_margin">
      <div className="container mx-auto justify-center flex flex-col md:flex-row  py-20 gap-5  min-h-full items-center ">
        <div className="py-8 px-8 max-w-5xl mx-auto border border-gray-300 h-full rounded-2xl w-[500px] max-w-full">
          <div className="flex flex-col text-center w-full mb-20 w-full">
            <p className="font-medium text-primary mb-5">Pricing</p>
            <h2 className="font-bold text-5xl tracking-tight">
              $2<span className="text-lg  font-normal"> / Month</span>
            </h2>
          </div>
          <ul className="space-y-2.5 leading-relaxed text-base flex-1">
            {[
              {
                name: "NextJS boilerplate",
              },
              { name: "User oauth" },
              { name: "Database" },
              { name: "Emails" },
              { name: "1 year of updates" },
              { name: "24/7 support" },
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-[18px] h-[18px] opacity-80 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{feature.name} </span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 ">
            <a
              className="btn btn-primary btn-block "
              target="_blank"
              href={plan.link + "?prefilled_email=" + session?.user?.email}
            >
              <button
                type="button"
                className="bg-[--primary] flex w-full justify-center text-md md:text-lg gap-2  py-2 px-6 rounded-full mt-5 mb-5 items-center 
      hover:bg-black hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
              >
                <p className="text-[16px] font-medium">Get Started</p>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
