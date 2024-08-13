import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(req: NextRequest) {
  /* const session = await getSession();
  //console.log(session);
  if (req.nextUrl.pathname === "/profile") {
    return NextResponse.redirect(new URL("/", req.url));
  } */
  const session = await getSession();
  const exists = publicOnlyUrls[req.nextUrl.pathname];
  console.log("middleware");
  if (!session.id) {
    console.log("middleware no session");
    if (!exists) {
      console.log("middleware no session not exists");
      return NextResponse.redirect(new URL("/", req.url));
      //return NextResponse.redirect(new URL("/create-account", req.url));
    }
  } else {
    console.log("middleware has session");

    if (exists) {
      console.log("middleware has session and exists");
      //return NextResponse.redirect(new URL("/products", req.url));
      return NextResponse.redirect(new URL("/tweets", req.url));
    }
  }
}
