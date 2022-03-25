import { NextRequest, NextResponse } from "next/server";

const signedInPages = [
    '/',
    '/playlist',
    '/library'
]

export default function middleware(req: NextRequest) {
    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.access_token;

        if (!token) {
            return NextResponse.redirect('/signin');
        }
    }
}