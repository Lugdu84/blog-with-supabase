import { readBlogContentById } from '@/lib/actions/blog'

type BlogPageEditProps = {
  params: {
    id: string
  }
}

export default async function BlogPageEdit({
  params: { id },
}: BlogPageEditProps) {
  const data = await readBlogContentById(id)

  console.log(data)

  return <div>{id}</div>
}
