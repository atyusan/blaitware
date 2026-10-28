import { NextResponse } from "next/server";

const LOCALES = ["de", "zh-cn"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const matched = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (matched) {
    const stripped = pathname.replace(new RegExp(`^/${matched}`), "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-locale", matched);
    response.cookies.set("NEXT_LOCALE", matched, { path: "/" });
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-locale", "en");
  response.cookies.set("NEXT_LOCALE", "en", { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
