
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

const PUBLIC_PATHS = ['/', '/login', '/register', '/contact', '/privacy', '/terms'];

async function verifyToken(token: string): Promise<JWTPayload | null> {
    if (!JWT_SECRET) {
        console.error('JWT_SECRET no está definido en las variables de entorno.');
        return null;
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return payload;
    } catch (err) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    
    // Allow API routes for auth and verification to pass through without a token.
    if (pathname.startsWith('/api/auth/')) {
        return NextResponse.next();
    }

    const payload = token ? await verifyToken(token) : null;
    
    const requestHeaders = new Headers(request.headers);
    if (payload?.userId) {
        requestHeaders.set('x-user-id', payload.userId as string);
        requestHeaders.set('x-user-role', payload.role as string);
    }
    
    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path);
    const isDashboardPath = pathname.startsWith('/dashboard');

    if (payload) {
        // If logged in, redirect from login/register to dashboard
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        // If trying to access admin but not admin, redirect to dashboard
        if (pathname.startsWith('/dashboard/admin') && payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else {
        // If not logged in and trying to access a protected path, redirect to login
        if (isDashboardPath) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('next', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
