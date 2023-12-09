import React from 'react'
import { EyeIcon, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DeleteAlert from './delete-alert'

type ActionsTableProps = {
  id: string
}

export default function ActionsTable({ id }: ActionsTableProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" className="flex items-center gap-2">
        <EyeIcon />
        Voir
      </Button>
      <DeleteAlert blogId={id} />
      <Link href={`/dashboard/blog/edit/${id}`}>
        <Button variant="outline" className="flex items-center gap-2">
          <PencilIcon />
          Editer
        </Button>
      </Link>
    </div>
  )
}
