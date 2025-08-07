import { NextRequest } from "next/server";

export const isLoggedIn = (req: NextRequest): boolean => {
  return Boolean(req.cookies.get("refresh")?.value);
};

export const matchesPath = (pathname: string, paths: string[]) =>
  paths.some(path => pathname.startsWith(path));
