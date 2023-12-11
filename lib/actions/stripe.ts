'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const checkout = async (email: string, redirectTo: string) =>
  JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url:
        `${process.env.SITE_URL}/${redirectTo}` || process.env.SITE_URL!,
      cancel_url: process.env.SITE_URL!,
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
