import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Якщо шлях починається з /board/, але немає локалі попереду
  if (pathname.startsWith("/board/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Вкажемо для яких маршрутів працює middleware
export const config = {
  matcher: ["/board/:path*"],
};
