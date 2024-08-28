import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const checkPublicPath = path === "/sign-up" || path === "/sign-in" || path === "/client-data-fetch";
  const getCookies = cookies();
  const token = getCookies.get("token")?.value || "";
  if (checkPublicPath && token !== "") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/client-data-fetch']
}
