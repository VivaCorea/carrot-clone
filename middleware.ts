import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  //"/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[req.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/tweets", req.url));
    }
  }
}
