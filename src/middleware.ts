
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(token, secretKey);
    const response = NextResponse.next();
    // Adjuntar el ID de usuario a la solicitud para que las rutas API puedan usarlo
    const payload = await jwtVerify(token, secretKey);
    response.headers.set('x-user-id', payload.payload.userId as string);
     response.headers.set('x-user-email', payload.payload.email as string);
    return response;
  } catch (err) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/user/:path*'],
};
