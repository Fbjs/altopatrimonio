
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

// Rutas que no requieren autenticación
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
        // Ignoramos los errores de verificación, ya que un token inválido es como no tener token.
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const payload = token ? await verifyToken(token) : null;
    
    // Si es una ruta de API, el manejo se hará a nivel de ruta individual,
    // pero adjuntamos headers si el usuario está autenticado.
    if (pathname.startsWith('/api/')) {
        if (payload) {
            const requestHeaders = new Headers(request.headers);
            if (payload.userId) {
                requestHeaders.set('x-user-id', payload.userId as string);
            }
            if (payload.email) {
                requestHeaders.set('x-user-email', payload.email as string);
            }
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }
        // Para rutas de API públicas (login, register), simplemente continuamos
        return NextResponse.next();
    }


    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path || (path !== '/' && pathname.startsWith(path) && pathname.charAt(path.length) === '/'));


    // Si el usuario está autenticado
    if (payload) {
        // Si intenta acceder a login/register, redirigir al dashboard
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        // Permitir acceso a cualquier otra ruta
        return NextResponse.next();
    }

    // Si el usuario no está autenticado y la ruta no es pública
    if (!isPublicPath) {
        // Redirigir a login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token'); // Limpiar cookie inválida/expirada
        return response;
    }

    // Permitir acceso a rutas públicas para usuarios no autenticados
    return NextResponse.next();
}

export const config = {
  // Ejecutar el middleware en todas las rutas excepto las de archivos estáticos.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
