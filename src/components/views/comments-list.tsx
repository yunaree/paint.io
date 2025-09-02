import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation';
import { Comment } from '@/types/Comment.type';
import { useComments } from '@/context/comments-context';

function CommentsList() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
    const { comments, fetchComments } = useComments();

    useEffect(() => {
        if (id) fetchComments(id);
    }, [id]);

    return (
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
    );
}

export default CommentsList;