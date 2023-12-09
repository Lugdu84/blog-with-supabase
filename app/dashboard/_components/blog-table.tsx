import { Switch } from '@/components/ui/switch'
import ActionsTable from './actions-table'
import { readBlog } from '@/lib/actions/blog'

export default async function BlogTable() {
  const { data: blogs } = await readBlog()

  console.log('all blogs', blogs)
  return (
    <div className=" overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full">
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h2 className="col-span-2">Title</h2>
          <h2>Prenium</h2>
          <h2>Publish</h2>
        </div>
        {blogs?.map(({ title, id, is_prenium, is_published }) => (
          <div key={id} className="grid grid-cols-5 p-5">
            <p className="col-span-2">{title}</p>
            <Switch checked={is_prenium} />
            <Switch checked={is_published} />
            <ActionsTable id={id} />
          </div>
        ))}
      </div>
    </div>
  )
}
