import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export async function GET(request: Request) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  if (id === '*') {
    const result = await supabase.from('blog').select('id').limit(10)
    return Response.json({ ...result })
  }
  if (id) {
    const result = await supabase.from('blog').select('*').eq('id', id).single()
    return Response.json({ ...result })
  }
  return Response.json({})
}
