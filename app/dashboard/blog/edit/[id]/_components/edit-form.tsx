'use client'

import toast from 'react-hot-toast'
import BlogForm from '@/app/dashboard/_components/blog-form'
import { updateBlogDetailById } from '@/lib/actions/blog'
import { BlogFormSchemaType } from '@/lib/schema/blog'
import { IBlogDetail } from '@/types/blog'

type BlogFormProps = {
  blog: IBlogDetail
}

export default function EditForm({ blog }: BlogFormProps) {
  const handleUpdate = async (data: BlogFormSchemaType) => {
    console.log('update')
    if (!blog) return
    await updateBlogDetailById(blog.id, data)
      .then(() => {
        toast.success('Le blog a bien modifié')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return <BlogForm onHandleSubmit={handleUpdate} blog={blog} />
}
