import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseAdmin } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const POST = async (request: Request) => {
  const body = await request.text()

  let event: Stripe.Event

  try {
    const signature = headers().get('stripe-signature') as string

    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(`Webhook Error : ${error.message}`, { status: 400 })
  }

  if (event.type === 'customer.updated') {
    const customer = event.data.object as Stripe.Customer
    const subscription = await stripe.subscriptions.list({
      customer: customer.id,
    })
    if (subscription.data.length) {
      const sub = subscription.data[0]
      // call to supabase to user table
      const data = {
        subscription_status: sub.status === 'active',
        stripe_customer_id: customer.id,
        stripe_subscription_id: sub.id,
        email: customer.email as string,
      }
      onSuccessSubscription(data)
    }
  }

  return new NextResponse('Success', { status: 200 })
}

type dataSubscription = {
  subscription_status: boolean
  stripe_customer_id: string
  stripe_subscription_id: string
  email: string
}
const onSuccessSubscription = async ({
  subscription_status,
  stripe_customer_id,
  stripe_subscription_id,
  email,
}: dataSubscription) => {
  const supabaseAdmin = await createSupabaseAdmin()
  return supabaseAdmin
    .from('users')
    .update({
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id,
    })
    .eq('email', email)
}
