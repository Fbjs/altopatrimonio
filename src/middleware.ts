
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

// Rutas que no requieren autenticación
const PUBLIC_PATHS = ['/', '/login', '/register', '/contact', '/privacy', '/terms'];
// Rutas de API que no deben ser protegidas por este middleware
const PUBLIC_API_PATHS = ['/api/auth/login', '/api/auth/register', '/api/auth/verify'];


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

    // Ignorar rutas de archivos estáticos y de imágenes de Next.js
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Asumimos que rutas con punto son para archivos (ej: favicon.ico)
    ) {
        return NextResponse.next();
    }
    
    // Verificar si es una ruta de API pública
    if (PUBLIC_API_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const payload = token ? await verifyToken(token) : null;
    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path);

    // Si el usuario está autenticado
    if (payload) {
        // Si intenta acceder a login/register, redirigir al dashboard
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // Para todas las demás rutas (incluidas las de API protegidas), adjuntar headers y continuar
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

    // Si el usuario no está autenticado
    if (!isPublicPath) {
        // Si intenta acceder a una ruta protegida, redirigir a login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname); // Opcional: redirigir de vuelta después del login
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token'); // Limpiar cookie inválida
        return response;
    }
    
    // Permitir acceso a rutas públicas para usuarios no autenticados
    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'],
};
