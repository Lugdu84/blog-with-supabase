'use client'

import { SiGithub } from 'react-icons/si'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function LoginForm() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // eslint-disable-next-line no-restricted-globals
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    })
  }

  if (!isClient) {
    return null
  }
  return (
    <Button onClick={handleLogin} variant="outline" className="gap-2">
      <SiGithub />
      Login
    </Button>
  )
}
