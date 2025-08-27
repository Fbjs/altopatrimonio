
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}
const secretKey = new TextEncoder().encode(JWT_SECRET);

const PUBLIC_PATHS = ['/login', '/register', '/api/auth/login', '/api/auth/register', '/api/auth/verify'];
const DASHBOARD_PATH = '/dashboard';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));

  // 1. Try to verify the token
  let payload;
  if (token) {
    try {
      const { payload: verifiedPayload } = await jwtVerify(token, secretKey);
      payload = verifiedPayload;
    } catch (err) {
      // Token is invalid. Clear it.
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', { maxAge: -1 });
      return response;
    }
  }

  // 2. User has a valid token
  if (payload) {
    // If user is on a public path (like /login), redirect them to dashboard
    if (isPublicPath) {
      const url = request.nextUrl.clone();
      url.pathname = DASHBOARD_PATH;
      return NextResponse.redirect(url);
    }
    
    // If user is on a protected path, add user data to headers and allow access
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-email', payload.email as string);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 3. User does NOT have a token
  // If they are trying to access a protected route, redirect to login
  if (!isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // Otherwise, if they are on a public path without a token, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
