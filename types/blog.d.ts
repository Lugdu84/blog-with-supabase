export type IBlog = {
  created_at: string
  id: string
  image_url: string
  is_prenium: boolean
  is_published: boolean
  title: string
}

export type IBlogDetail = IBlog & {
  blog_content: {
    blog_id: string
    content: string
  } | null
}
