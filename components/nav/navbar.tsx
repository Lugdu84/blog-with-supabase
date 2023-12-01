import Link from 'next/link'
import React from 'react'
import { SiGithub } from 'react-icons/si'
import { Button } from '../ui/button'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link className="text-2xl font-bold" href="/">
          DailyBlog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500" />
      </div>
      <Button variant="outline" className="gap-2">
        <SiGithub />
        Login
      </Button>
    </nav>
  )
}
