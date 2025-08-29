'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Comment } from '@/types/Comment.type'

export default function BoardPage() {
  const { id } = useParams() 
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('board_id', id)
      .order('created_at', { ascending: false })

    if (data) setComments(data)
  }

  useEffect(() => {
    if (id) fetchComments()
  }, [id])

  const addComment = async () => {
    if (!newComment.trim()) return
    const { error } = await supabase
      .from('comments')
      .insert([{ board_id: id, text: newComment }])

    if (!error) {
      setNewComment('')
      fetchComments()
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Анонімна дошка</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Напиши анонімний коментар..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addComment}
        >
          Додати
        </button>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500">Ще немає коментарів 😶</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="border p-3 rounded bg-gray-50">
              <p>{c.text}</p>
              <span className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
