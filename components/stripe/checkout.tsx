import React from 'react'
import { BsLightning } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import { readSession } from '@/lib/user'
import LoginForm from '../nav/login-form'

export default async function Checkout() {
  const { data } = await readSession()

  if (!data.session) {
    return (
      <div className="flex items-center h-96 w-full justify-center gap-2">
        <LoginForm /> to read
      </div>
    )
  }
  return (
    <form className="h-96 w-full flex items-center justify-center" action="">
      <Button
        variant="ghost"
        className="flex flex-col p-10 gap-5 ring-2 ring-green-500"
      >
        <span className="flex items-center gap-2 text-2xl font-bold text-green-500">
          <BsLightning className="w-5 h-5" />
          Upgrade to Pro
        </span>
        <span>Unlock all blog content</span>
      </Button>
    </form>
  )
}
