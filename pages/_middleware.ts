import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

const signedInPages = [
    '/',
    '/playlist',
    '/library'
]

export default function middleware(req: NextRequest) {
    const nextUrl = req.nextUrl;
    if (signedInPages.find((p) => p === nextUrl.pathname)) {
        const token = req.cookies.access_token;

        if (!token) {
            const url = nextUrl.clone();
            url.pathname = '/signin';
            return NextResponse.redirect(url);
        }
    }
}