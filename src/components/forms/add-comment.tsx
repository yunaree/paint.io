import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Pen } from 'lucide-react';
import { useAlert } from '../providers/provider';
import Alert from '../alerts';
import { useComments } from '@/context/comments-context';

function AddComment() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
    const { showAlert } = useAlert()
    const [newComment, setNewComment] = useState('')
    const { fetchComments } = useComments();

    const handleAdd = async (text: string) => {
      if (!id) return;
      await supabase.from("comments").insert({ text, board_id: id });
      await fetchComments(id); 
      setNewComment('');
      showAlert(<Alert.AddCommentSuccess/>);
    };

    return (
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Write an anonymous comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></Input>
        <Button
          onClick={()=>handleAdd(newComment)}
        >
          <Pen/> Add
        </Button>
      </div>
    );
}

export default AddComment;