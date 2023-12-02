'use client'

import Link from 'next/link'
import { CircleUser, LayoutDashboard } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function NavLinks() {
  const pathname = usePathname()
  const links = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      Icon: LayoutDashboard,
    },
    {
      name: 'Settings',
      href: '/dashboard/user',
      Icon: CircleUser,
    },
  ]

  const isSelectedLink = (href: string) => pathname === href
  return (
    <div className="flex items-center gap-5 border-b pb-2">
      {links.map(({ href, name, Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-1 hover:underline transition-all',
            isSelectedLink(href) && 'text-green-500',
          )}
        >
          <Icon />
          <span>{name}</span>
        </Link>
      ))}
    </div>
  )
}
