import MarkdownPreview from '@/components/markdown/markdown-preview'
import Checkout from '@/components/stripe/checkout'
import { getContentBlogById } from '@/lib/actions/blog'

type BlogContentProps = {
  id: string
}

export default async function BlogContent({ id }: BlogContentProps) {
  const data = await getContentBlogById(id)

  if (!data?.content) {
    return <Checkout />
  }

  return <MarkdownPreview content={data.content} />
}
