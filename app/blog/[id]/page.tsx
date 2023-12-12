import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { headers } from 'next/headers'
import { Metadata } from 'next'
import { IBlog } from '@/types/blog'
import BlogContent from './_components/blog-content'
import MainSkeleton from '@/components/skeletton/main-skeleton'
import { getContentBlogById } from '@/lib/actions/blog'

type BlogPageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params: { id },
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogById(id)
  const url = getUrl()
  return {
    title: blog.title,
    authors: {
      name: 'Devaidaya',
    },
    metadataBase: new URL(url),
    openGraph: {
      title: blog.title,
      url: `${url}/blog/${id}`,
      siteName: 'Devaidaya',
      images: blog.image_url,
      type: 'website',
    },
    keywords: ['devaidaya', 'blog', 'dev', 'devaidaya blog'],
  }
}

const getUrl = () => {
  const header = headers()
  const host = header.get('host')
  return `https://${host}`
}

async function getBlogById(id: string) {
  const url = getUrl()
  const { data: blog } = (await fetch(`${url}/api/blog?id=${id}`).then((res) =>
    res.json(),
  )) as { data: IBlog }

  return blog
}

export default async function BlogPage({ params: { id } }: BlogPageProps) {
  const blog = await getBlogById(id)

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
