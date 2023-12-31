'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useUser } from '@/lib/store/user'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import ManageBilling from '@/components/stripe/manage-billing'

export default function Profil() {
  const user = useUser((state) => state.user)
  const setUser = useUser((state) => state.setUser)

  const handleLogout = () => {
    supabase.auth.signOut()
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'
  const isSub = user?.stripe_customer_id
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          width={64}
          height={64}
          src={user?.image_url as string}
          alt={user?.display_name || ''}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-3 divide-y">
        <div className="px-4 text-sm">
          <p>{user?.display_name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        {isSub && !isAdmin && (
          <PopoverClose asChild>
            <ManageBilling curstomerId={isSub} />
          </PopoverClose>
        )}
        {isAdmin && (
          <Link className="block" href="/dashboard">
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between"
              >
                Dashboard
                <MdOutlineDashboard />
              </Button>
            </PopoverClose>
          </Link>
        )}

        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-between"
          variant="ghost"
        >
          Logout
          <RiLogoutCircleLine />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
