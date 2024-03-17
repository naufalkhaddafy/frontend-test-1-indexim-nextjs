import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get("token");
  const urlPathname = request.nextUrl.pathname;
  //   const url = req.nextUrl.origin;

  if (!token && urlPathname == "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && urlPathname == "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
