import { NextRequest, NextResponse } from "next/server";

import { ONLY_AUTH_PATHS, ONLY_GUEST_PATHS } from "./constants/auth-paths";
import { isLoggedIn, matchesPath } from "./utils/auth/authUtils";

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  if (!loggedIn && matchesPath(pathname, ONLY_AUTH_PATHS)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (loggedIn && matchesPath(pathname, ONLY_GUEST_PATHS)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/auth/:path*",
    "/signup/:path*",
    "/admin/:path*",
    "/home/filter",
    "/listings/:path*",
    "/mypage/:path*",
    "/notifications",
    "/viewing/:path*",
  ],
};
