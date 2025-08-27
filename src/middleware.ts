
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/register', '/api/auth/login', '/api/auth/register', '/api/auth/verify'];

  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Si se accede a una ruta pública y NO hay token, permitir el acceso.
  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  // Si se accede a una ruta pública y SÍ hay token, redirigir al dashboard.
  if (isPublicPath && token) {
    try {
      await jwtVerify(token, secretKey);
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    } catch (err) {
      // Si el token es inválido, permitir que se quede en la página pública (login/register).
       return NextResponse.next();
    }
  }
  
  // A partir de aquí, son rutas protegidas.
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    
    // Adjuntar el ID y email de usuario a la solicitud para que las rutas API puedan usarlo
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-email', payload.email as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (err) {
    // Si el token es inválido en una ruta protegida, borrar la cookie y redirigir a login.
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const response = NextResponse.redirect(url);
    response.cookies.set('token', '', { maxAge: -1 });
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
