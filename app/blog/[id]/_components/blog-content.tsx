import dynamic from 'next/dynamic'
import MarkdownPreview from '@/components/markdown/markdown-preview'
import { getContentBlogById } from '@/lib/actions/blog'

const Checkout = dynamic(() => import('@/components/stripe/checkout'), {
  ssr: false,
})

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
