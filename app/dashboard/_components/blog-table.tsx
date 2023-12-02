import ActionsTable from './actions-table'

export default function BlogTable() {
  return (
    <div className=" overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full">
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h2 className="col-span-2">Title</h2>
          <h2>Prenium</h2>
          <h2>Publish</h2>
        </div>
        <div className="grid grid-cols-5 p-5">
          <p className="col-span-2">Blog Title</p>
          <p>Blog Title</p>
          <p>Blog Title</p>
          <ActionsTable />
        </div>
      </div>
    </div>
  )
}
