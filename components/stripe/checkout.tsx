'use client'

import { BsLightning } from 'react-icons/bs'
import { FormEvent, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import LoginForm from '../nav/login-form'
import { checkout } from '@/lib/actions/stripe'
import { useUser } from '@/lib/store/user'
import { cn } from '@/lib/utils'

export default function Checkout() {
  const pahtname = usePathname()
  const user = useUser((state) => state.user)
  const [isPending, startTransition] = useTransition()

  if (!user) {
    return (
      <div className="flex items-center h-96 w-full justify-center gap-2">
        <LoginForm /> to read
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const data = JSON.parse(await checkout(user.email!, pahtname))
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      )
      await stripe?.redirectToCheckout({
        sessionId: data.id,
      })
    })
  }
  return (
    <form
      className="h-96 w-full flex items-center justify-center"
      action=""
      onSubmit={handleSubmit}
    >
      <Button
        variant="ghost"
        className="flex flex-col p-10 gap-5 ring-2 ring-green-500"
      >
        <span className="flex items-center gap-2 text-2xl font-bold text-green-500">
          <BsLightning
            className={cn(
              'w-5 h-5',
              isPending ? 'animate-spin' : 'animate-bounce',
            )}
          />
          Upgrade to Pro
        </span>
        <span>Unlock all blog content</span>
      </Button>
    </form>
  )
}
