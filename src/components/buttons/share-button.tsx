"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export function ShareButton({ url }: { url: string }) {
  const [open, setOpen] = useState(false)

  const handleShare = async () => {
    if (!url) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My board",
          text: "I want to share my board with you 📌 Take a look!",
          url: url,
        })
      } catch {
        // Якщо юзер закрив share — нічого страшного
      }
    } else {
      setOpen((prev) => !prev) // відкриваємо fallback-меню
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const text = encodeURIComponent("Check out my board:")

  return (
    <div className="relative inline-block">
      <Button variant="outline" disabled={!url} onClick={handleShare}>
        <Share2 />
      </Button>

      {open && (
        <div className="absolute mt-2 w-48 rounded-xl border bg-white shadow-lg p-2 space-y-1 z-50">
          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Telegram
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Twitter / X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            LinkedIn
          </a>
        </div>
      )}
    </div>
  )
}
