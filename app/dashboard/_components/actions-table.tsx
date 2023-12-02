import React from 'react'
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ActionsTable() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" className="flex items-center gap-2">
        <EyeIcon />
        Voir
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Trash2Icon />
        Supprimer
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <PencilIcon />
        Editer
      </Button>
    </div>
  )
}
