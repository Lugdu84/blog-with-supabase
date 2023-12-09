import { readBlogContentById } from '@/lib/actions/blog'
import EditForm from './_components/edit-form'

type BlogPageEditProps = {
  params: {
    id: string
  }
}

export default async function BlogPageEdit({
  params: { id },
}: BlogPageEditProps) {
  const data = await readBlogContentById(id)

  return (
    <div>
      <EditForm blog={data} />
    </div>
  )
}
