import { match } from "assert";
import MiddlewarePlugin from "next/dist/build/webpack/plugins/middleware-plugin";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  let isAuthenticated = false;
  if (!isAuthenticated) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/posts", "/account"],
};
