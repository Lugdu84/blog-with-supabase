import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

type DeleteAlertProps = {
  blogId: string
}

export default function DeleteAlert({ blogId }: DeleteAlertProps) {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <Trash2Icon />
      Supprimer
    </Button>
  )
}
