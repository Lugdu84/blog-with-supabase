'use client'

import { SiGithub } from 'react-icons/si'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function LoginForm() {
  const pathname = usePathname()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // eslint-disable-next-line no-restricted-globals
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    })
  }
  return (
    <Button onClick={handleLogin} variant="outline" className="gap-2">
      <SiGithub />
      Login
    </Button>
  )
}
