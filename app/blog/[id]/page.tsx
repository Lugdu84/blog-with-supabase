import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { headers } from 'next/headers'
import { IBlog } from '@/types/blog'
import BlogContent from './_components/blog-content'
import MainSkeleton from '@/components/skeletton/main-skeleton'

type BlogPageProps = {
  params: {
    id: string
  }
}

export default async function BlogPage({ params: { id } }: BlogPageProps) {
  const header = headers()
  const host = header.get('host')
  const { data: blog } = (await fetch(`https://${host}/api/blog?id=${id}`).then(
    (res) => res.json(),
  )) as { data: IBlog }

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-2">
      <div className="sm:px-10 space-y-5">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-sm text-gray-400">
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <div className="w-full h-96 relative">
          <Image
            src={blog.image_url}
            fill
            alt="cover"
            className="object-cover object-center rounded-md border"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <Suspense fallback={<MainSkeleton />}>
        <BlogContent id={id} />
      </Suspense>
    </div>
  )
}
