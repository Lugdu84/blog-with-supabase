'use client'

import { useUser } from '@/lib/store/user'

export default function Profil() {
  const user = useUser((state) => state.user)
  console.log(user)
  return <div>profil</div>
}
