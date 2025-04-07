import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  await connectDB();

  const body = await req.text();

  const header = await headers(); // Await headers here
  const signature = header.get("stripe-signature");

  let data;
  let eventType;
  let event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        let user;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;

        if (customer.email) {
          user = await User.findOne({ email: customer.email });

          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
              customerId,
            });

            await user.save();
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Update user data + Grant user access to your product
        user.priceId = priceId;
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "customer.subscription.deleted": {
        // Retrieve the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );
        const customerId = subscription.customer;

        // Ensure the customer ID exists
        if (!customerId) {
          console.error("No customer ID found in subscription.deleted event.");
          break;
        }

        // Retrieve the customer details
        const customer = await stripe.customers.retrieve(customerId);

        // Ensure the customer has an email
        if (!customer.email) {
          console.error(`No email found for customer ID: ${customerId}`);
          break;
        }

        // Find the user in the database
        const user = await User.findOne({ email: customer.email });

        // If no user is found, log an error and exit
        if (!user) {
          console.error(`No user found with email: ${customer.email}`);
          break;
        }

        // Revoke access to your product
        user.hasAccess = false;
        await user.save();

        console.log(`Access revoked for user: ${customer.email}`);

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
