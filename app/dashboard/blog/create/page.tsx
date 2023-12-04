'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import BlogForm from '@/app/dashboard/_components/blog-form'
import { createBlog } from '@/lib/actions/blog'
import { BlogFormSchemaType } from '@/lib/schema/blog'

export default function BlogPageCreate() {
  const router = useRouter()
  const handleCreate = async (data: BlogFormSchemaType) => {
    await createBlog(data)
      .then(() => {
        toast.success('Le bog a bien été créé')
        router.push('/dashboard')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return <BlogForm onHandleSubmit={handleCreate} />
}
