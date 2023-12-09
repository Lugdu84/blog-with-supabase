'use client'

import { Trash2Icon } from 'lucide-react'
import React, { useTransition } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteBlogById } from '@/lib/actions/blog'
import { cn } from '@/lib/utils'

type DeleteAlertProps = {
  blogId: string
}

export default function DeleteAlert({ blogId }: DeleteAlertProps) {
  const [isPending, startTransition] = useTransition()
  const handleDelete = async () => {
    startTransition(async () => {
      await deleteBlogById(blogId)
        .then(() => {
          toast.success('Le bog a bien été supprimé')
        })
        .catch((error) => {
          toast.error(error.message)
        })
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Trash2Icon />
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="gap-2" onClick={handleDelete}>
            <AiOutlineLoading3Quarters
              className={cn('animate-spin', !isPending && 'hidden')}
            />
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
