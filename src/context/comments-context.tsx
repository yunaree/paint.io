"use client";

import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Comment } from "@/types/Comment.type";

type CommentsContextType = {
  comments: Comment[];
  fetchComments: (boardId: string, page: number, limit: number) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean; 
  totalCount: number; 
};

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); 
  const [totalCount, setTotalCount] = useState(0); 

  const fetchComments = async (boardId: string, page: number, limit: number) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count }: { data: Comment[] | null; count: number | null } =
      await supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("board_id", boardId)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (data) {
        setComments(data);
        setHasMore(data.length === limit); 
      }

      if (count !== null) {
        setTotalCount(count);
      }
    };

    return (
      <CommentsContext.Provider value={{ comments, fetchComments, page, setPage, hasMore, totalCount }}>
        {children}
      </CommentsContext.Provider>
    );
  }

export function useComments() {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be used inside CommentsProvider");
  return ctx;
}
