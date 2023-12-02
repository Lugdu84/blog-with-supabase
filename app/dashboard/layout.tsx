import { ReactNode } from 'react'
import NavLinks from './_components/nav-links'

type DashboardLayoutProps = {
  children: ReactNode
}
export default function DashBoardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="space-y-5">
      <NavLinks />
      {children}
    </div>
  )
}
