"use client";

import { useSession, signIn } from "next-auth/react";

// Customer portal link
const customerPortalLink =
  "https://billing.stripe.com/p/login/test_dR65og4aP0v2eT6eUU";

const ButtonCustomerPortal = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated" ) {
    return (
      <div className="w-full flex justify-end mb-5 mr-2">
        <a
          href={customerPortalLink + "?prefilled_email=" + session.user?.email}
          className="btn underline "
        >
          Manage Subscription
        </a>
      </div>
    );
  }

  return (
    <></>
  );
};

export default ButtonCustomerPortal;
