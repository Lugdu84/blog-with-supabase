import MarkdownPreview from '@/components/markdown/markdown-preview'
import { getContentBlogById } from '@/lib/actions/blog'

type BlogContentProps = {
  id: string
}

export default async function BlogContent({ id }: BlogContentProps) {
  const data = await getContentBlogById(id)

  if (!data) {
    return null
  }

  return <MarkdownPreview content={data.content} />
}
