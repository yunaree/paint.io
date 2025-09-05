"use client";

import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Comment } from "@/types/Comment.type";

type CommentsContextType = {
  comments: Comment[];
  fetchComments: (boardId: string, page: number, limit: number) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean; // ✅ додали сюди
};

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // ✅ стан для hasMore

  const fetchComments = async (boardId: string, page: number, limit: number) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (data) {
      setComments(data);
      setHasMore(data.length === limit); // ✅ якщо прийшло менше ніж limit → більше сторінок нема
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, fetchComments, page, setPage, hasMore }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be used inside CommentsProvider");
  return ctx;
}
