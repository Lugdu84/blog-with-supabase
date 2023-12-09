import Link from 'next/link'
import Image from 'next/image'
import { readBlog } from '@/lib/actions/blog'

export default async function Home() {
  const { data: blogs } = await readBlog()
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 p-5 xl:p-0">
      {blogs?.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.id}`}
          className="w-ful rounded-md bg-gradient-dark p-5 hover:ring-2 ring-green-500 transition-all first:lg:col-span-2 first:md:col-span-3"
        >
          <div className="relative w-full h-72 md:h-64 xl:h-96">
            <Image
              priority
              src={blog.image_url}
              alt="cover"
              fill
              className="obect-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
            <h2 className="text-xl text-bold">{blog.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
