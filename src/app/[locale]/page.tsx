'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export default function HomePage() {
  const [name, setName] = useState('')
  const router = useRouter()
  const { t } = useTranslation('common')

  const createBoard = async () => {
    const { data, error } = await supabase
      .from('boards')
      .insert([{ owner_name: name }])
      .select()
      .single()

    if (data) {
      router.push(`/board/${data.id}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl">Create your anonymous board</h1>
      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введи своє ім'я"
      />
      <button className="ml-2 p-2 bg-blue-500 text-white" onClick={createBoard}>
        Створити
      </button>
    </div>
  )
}
