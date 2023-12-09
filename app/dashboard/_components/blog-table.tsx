/* eslint-disable react/jsx-no-bind */
import ActionsTable from './actions-table'
import { readBlog, updateBlogById } from '@/lib/actions/blog'
import SwithForm from './switch-form'
import { BlogFormSchemaType } from '@/lib/schema/blog'

export default async function BlogTable() {
  const { data: blogs } = await readBlog()

  return (
    <div className=" overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full">
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h2 className="col-span-2">Title</h2>
          <h2>Prenium</h2>
          <h2>Publish</h2>
        </div>
        {blogs?.map(({ title, id, is_prenium, is_published }) => {
          const updatePrenium = updateBlogById.bind(null, id, {
            is_prenium: !is_prenium,
          } as BlogFormSchemaType)
          const updatePublish = updateBlogById.bind(null, id, {
            is_published: !is_published,
          } as BlogFormSchemaType)
          return (
            <div key={id} className="grid grid-cols-5 p-5">
              <p className="col-span-2">{title}</p>
              <SwithForm checked={is_prenium} onToggle={updatePrenium} />
              <SwithForm checked={is_published} onToggle={updatePublish} />
              <ActionsTable id={id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
