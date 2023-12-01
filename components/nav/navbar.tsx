import Link from 'next/link'
import React from 'react'
import LoginForm from './login-form'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link className="text-2xl font-bold" href="/">
          DailyBlog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500" />
      </div>
      <LoginForm />
    </nav>
  )
}
