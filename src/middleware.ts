
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

const PUBLIC_PATHS = ['/', '/login', '/register', '/contact', '/privacy', '/terms', '/api/auth/login', '/api/auth/register', '/api/auth/verify'];

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

    // Verificar si es una ruta estática o de imagen para evitar procesarla
    if (pathname.startsWith('/_next') || pathname.startsWith('/static') || /\.(png|jpg|jpeg|gif|svg|ico)$/.test(pathname)) {
        return NextResponse.next();
    }
    
    // Verificar si es una ruta pública específica que no necesita autenticación
    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path) || (path !=='/' && pathname.startsWith(path)));
    const isApiVerification = pathname.startsWith('/api/auth/verify');

    if (isApiVerification) {
        return NextResponse.next();
    }

    const payload = token ? await verifyToken(token) : null;

    if (payload) { // El usuario está autenticado
        if (isPublicPath) {
            // Si el usuario autenticado intenta acceder a login/register, redirigir a dashboard
            if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
        // Para rutas protegidas, adjuntar headers y continuar
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId as string);
        requestHeaders.set('x-user-email', payload.email as string);
        return NextResponse.next({ request: { headers: requestHeaders } });
    
    } else { // El usuario no está autenticado
        if (!isPublicPath) {
            // Si intenta acceder a una ruta protegida, redirigir a login
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.set('token', '', { maxAge: -1 }); // Limpiar cookie inválida si existe
            return response;
        }
    }
    
    // Permitir acceso a rutas públicas para usuarios no autenticados
    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'],
};
