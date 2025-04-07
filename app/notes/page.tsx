'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  // return <pre>{JSON.stringify(notes, null, 2)}</pre>
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Notes</h1>
      <div className="flex flex-col gap-2">
        {notes?.map((note) => (
          <div key={note.id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}