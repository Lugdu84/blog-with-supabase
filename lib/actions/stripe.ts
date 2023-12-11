'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const checkout = async (email: string, redirectTo: string) =>
  JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: redirectTo,
      cancel_url: redirectTo,
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRO_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: 'subscription',
    }),
  )

export const manageBillingPortal = async (
  customerId: string,
  redirectTo: string,
) =>
  JSON.stringify(
    await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: redirectTo,
    }),
  )
