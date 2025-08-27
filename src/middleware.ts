
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

const PUBLIC_PATHS = ['/', '/login', '/register', '/contact', '/privacy', '/terms', '/api/auth/login', '/api/auth/register'];

async function verifyToken(token: string): Promise<JWTPayload | null> {
    if (!JWT_SECRET) {
        console.error('JWT_SECRET no está definido en las variables de entorno.');
        return null;
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return payload;
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // Ignorar rutas de archivos estáticos y de la API de verificación de correo
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/api/auth/verify') ||
        /\.(png|jpg|jpeg|gif|svg|ico)$/.test(pathname)
    ) {
        return NextResponse.next();
    }
    
    const payload = token ? await verifyToken(token) : null;
    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path || (path !=='/' && pathname.startsWith(path) && path.length > 1));

    if (payload) { // Usuario autenticado
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            // Si intenta acceder a login/register, redirigir a dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // Para todas las demás rutas (incluidas las de API), adjuntar headers y continuar
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
    } else { // Usuario no autenticado
        if (!isPublicPath) {
            // Si intenta acceder a una ruta protegida, redirigir a login
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('token'); // Limpiar cookie inválida
            return response;
        }
    }
    
    // Permitir acceso a rutas públicas para usuarios no autenticados
    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
