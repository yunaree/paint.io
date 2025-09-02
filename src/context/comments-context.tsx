"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Comment } from "@/types/Comment.type";

type CommentsContextType = {
  comments: Comment[];
  fetchComments: (boardId: string) => Promise<void>;
};

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (boardId: string) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });

    if (data) setComments(data);
  };

  return (
    <CommentsContext.Provider value={{ comments, fetchComments }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be used inside CommentsProvider");
  return ctx;
}
