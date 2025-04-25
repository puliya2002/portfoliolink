"use client";

import { useSession } from "next-auth/react";

const plans = [
  {
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1NfNc0F2kVprice_1R7swtCROFDtLkqB4FJqcAhu"
        : "price_1NfNc0F2kVprice_1R7swtCROFDtLkqB4FJqcAhu",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gw9CZfLvfnn5I4dQR"
        : "price_1NfNc0F2kVprice_1R7swtCROFDtLkqB4FJqcAhu",
    price: 2,
    duration: "/month",
    features: [
      "NextJS boilerplate",
      "User oauth",
      "Database",
      "Emails",
      "1 year of updates",
      "24/7 support",
    ],
  },
];

function Pricing() {
  const { data: session } = useSession();
  const plan = plans[0];

  return (
    <div className="main_margin">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center py-20 gap-5">
        <div className="border border-gray-300 rounded-2xl w-full max-w-[500px] px-8 py-8">
          <div className="text-center mb-10">
            <p className="font-medium text-primary mb-2">Pricing</p>
            <h2 className="font-bold text-5xl tracking-tight">
              ${plan.price}
              <span className="text-lg font-normal"> {plan.duration}</span>
            </h2>
          </div>

          <ul className="space-y-2.5 text-base leading-relaxed mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <svg
                  className="w-[18px] h-[18px] opacity-80 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={plan.link + "?prefilled_email=" + session?.user?.email}
            target="_blank"
            className="block"
          >
            <button
              type="button"
              className="bg-[--primary] w-full py-2 px-6 rounded-full text-md md:text-lg font-medium hover:bg-black hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
            >
              Get Started
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
