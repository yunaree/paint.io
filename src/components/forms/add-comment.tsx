import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Pen } from 'lucide-react';
import { useAlert } from '../providers/provider';
import Alert from '../alerts';
import { useComments } from '@/context/comments-context';
import { useTranslations } from 'next-intl';
import { Textarea } from '../ui/textarea';

function AddComment() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
    const { showAlert } = useAlert()
    const [newComment, setNewComment] = useState('')
    const { fetchComments } = useComments();
    const t  = useTranslations('forms.add_comment')

    const handleAdd = async (text: string) => {
      if (!id) return;
      await supabase.from("comments").insert({ text, board_id: id });
      await fetchComments(id, 1, 10); 
      setNewComment('');
      showAlert(<Alert.AddCommentSuccess/>);
    };

    return (
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t('title')}
          
        </h3>
        <Textarea 
          placeholder={t('input_placeholder')}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></Textarea>
        <Button
          onClick={()=>handleAdd(newComment)}
          disabled={newComment.trim().length === 0}
          className="self-end"
        >
          <Pen/> 
          {/* {t('submit_button')} */}
        </Button>
      </div>
    );
}

export default AddComment;