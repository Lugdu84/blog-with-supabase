'use client'

import Image from 'next/image'
import { useUser } from '@/lib/store/user'

export default function Profil() {
  const user = useUser((state) => state.user)
  return (
    <Image
      width={64}
      height={64}
      src={user?.user_metadata.avatar_url}
      alt={user?.user_metadata.user_name}
      className="rounded-full ring-2 ring-green-500"
    />
  )
}
