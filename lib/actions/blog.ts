'use server'

import { revalidatePath } from 'next/cache'
import { BlogFormSchemaType } from '../schema/blog'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const DASHBOARD = '/dashboard'

export const createBlog = async (data: BlogFormSchemaType) => {
  const supabase = await createSupabaseServerClient()
  const { content, ...blog } = data
  const { data: resultBlog, error } = await supabase
    .from('blog')
    .insert(blog)
    .select('id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  const { data: contentBlog, error: contentError } = await supabase
    .from('blog_content')
    .insert({
      blog_id: resultBlog?.id,
      content,
    })
    .select()

  if (contentError) {
    await supabase
      .from('blog')
      .delete()
      .eq('id', resultBlog?.id)
    throw new Error(contentError.message)
  }

  // Revalidation
  revalidatePath(DASHBOARD)
  return JSON.stringify(contentBlog)
}

export const readBlog = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase
    .from('blog')
    .select('*')
    .order('created_at', { ascending: true })
}

export const deleteBlogById = async (id: string) => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('blog').delete().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath(DASHBOARD)
}

export const updateBlogById = async (id: string, data: BlogFormSchemaType) => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('blog')
    .update(data)
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(DASHBOARD)
}

export const readBlogContentById = async (id: string) => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('blog')
    .select('*, blog_content(*)')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
