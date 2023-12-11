'use client'

import { BackpackIcon, Loader2Icon } from 'lucide-react'
import { useTransition } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { manageBillingPortal } from '@/lib/actions/stripe'
import { cn } from '@/lib/utils'

type ManageBillingProps = {
  curstomerId: string
}
export default function ManageBilling({ curstomerId }: ManageBillingProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    startTransition(async () => {
      const data = JSON.parse(
        await manageBillingPortal(curstomerId, `${window.origin}${pathname}`),
      )
      window.location.href = data.url
    })
  }
  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      className="flex items-center justify-between w-full"
      variant="ghost"
    >
      <span className="flex items-center gap-2">
        <Loader2Icon
          size={20}
          className={cn('animate-spin', !isPending && 'hidden')}
        />
        Billing
      </span>

      <BackpackIcon size={16} />
    </Button>
  )
}
