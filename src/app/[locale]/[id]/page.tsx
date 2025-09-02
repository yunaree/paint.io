'use client'
import AddComment from '@/components/forms/add-comment'
import CommentsList from '@/components/views/comments-list'

export default function BoardPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <AddComment/>
      <CommentsList/>
    </div>
  )
}
