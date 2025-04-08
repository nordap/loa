'use client'

import CheckTable from '@/components/checkTable'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [schedules, setSchedules] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('schedules').select();
      setSchedules(data? data : []);
    }
    getData()
  }, [])

  const onToggle = async (name: string, day: string) => {
    const { data } = await supabase.from('schedules').select().eq('name', name).single()
    if (data) {
      const newCan = data.can.includes(day) ? data.can.filter((d: string) => d !== day) : [...data.can, day]
      await supabase.from('schedules').update({ can: newCan }).eq('name', name)
      setSchedules(schedules?.map((schedule) => schedule.name === name ? { ...schedule, can: newCan } : schedule))
    }
  }

  return (
    <pre>
      {/* {schedules ? JSON.stringify(schedules, null, 2) : 'Loading...'}
      
      {schedules?.map((schedule) => (
        <div key={schedule.name}>
          <h1>{schedule.name}</h1>
          <p>{schedule.can}</p>
        </div>
      ))} */}
      
      <CheckTable data={schedules} onToggle={onToggle}>
      </CheckTable>

    </pre>
  )
}