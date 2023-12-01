'use client'

import { SiGithub } from 'react-icons/si'
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const pathname = usePathname()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

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
    <div>
      <Button onClick={handleLogin} variant="outline" className="gap-2">
        <SiGithub />
        Login
      </Button>
    </div>
  )
}
