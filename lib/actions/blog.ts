'use server'

import { CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { BlogFormSchemaType } from '../schema/blog'
import { Database } from '@/types/supabase'

const cookieStore = cookies()

const supabase = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options })
      },
    },
  },
)

export const createBlog = async (data: BlogFormSchemaType) => {
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
  revalidatePath('/dashboard')
  return JSON.stringify(contentBlog)
}
