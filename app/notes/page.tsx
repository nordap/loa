import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: schedules } = await supabase.from('schedules').select('*')

  return (
    <div>
      {JSON.stringify(schedules)}
    </div>
  )
}