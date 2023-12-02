import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BlogTable from './_components/blog-table'

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/create">
          <Button variant="outline" className="gap-2">
            Create <PlusIcon />
          </Button>
        </Link>
      </div>
      <BlogTable />
    </div>
  )
}
