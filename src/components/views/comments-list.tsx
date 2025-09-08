"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useComments } from "@/context/comments-context";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { HeartCrack } from "lucide-react";
import { useTranslations } from "next-intl";

function CommentsList() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const { comments, fetchComments, page, setPage, hasMore, totalCount } = useComments();
  const [previous, setPrevious] = React.useState(false);
  const t  = useTranslations('views')

  useEffect(() => {
    if (id) fetchComments(id, page, 10); 
  }, [id, page]);

  useEffect(() => {
    setPrevious(page > 1);
  }, [page]);

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{t("shown", { count: comments.length, total: totalCount })}</p>
      {comments.length === 0 ? (
        // <p className="text-gray-500">Ще немає коментарів 😶</p>
        <div>
          <HeartCrack className="mx-auto mb-2 text-gray-400" />
          <p className="text-center text-gray-500">No comments yet</p>
        </div>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border bg-white p-4 shadow-sm hover:shadow transition"
          >
            <p className="text-gray-800 text-sm">{c.text}</p>
            <div className="flex justify-end">
              <span className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}
        <Pagination>
            <PaginationContent>
            <PaginationItem>
                {previous && <PaginationPrevious
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                }}
                /> }
            </PaginationItem>
            {comments.length >= 10 && hasMore && (
                <div className="flex items-center gap-2">
                  <PaginationItem>
                  <PaginationLink href="#">{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                      <PaginationNext
                      href="#"
                      onClick={(e) => {
                          e.preventDefault();
                          if (hasMore) setPage(page + 1);
                      }}
                      />
                  </PaginationItem>
                </div>
            )}
            </PaginationContent>
        </Pagination>
        
    </div>
  );
}

export default CommentsList;
