
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

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
    const payload = token ? await verifyToken(token) : null;
    
    const requestHeaders = new Headers(request.headers);
    if (payload?.userId) {
        requestHeaders.set('x-user-id', payload.userId as string);
    }
    
    // Proteger rutas de API de administración
    if (pathname.startsWith('/api/admin')) {
        if (!payload || !payload.userId) {
             return new NextResponse(JSON.stringify({ message: 'No autorizado: Se requiere token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }
        
        await connectToDatabase();
        const user = await User.findById(payload.userId);
        
        if (!user || user.role !== 'admin') {
            return new NextResponse(JSON.stringify({ message: 'Acceso denegado: Se requiere rol de administrador' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
        }
        
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    if (pathname.startsWith('/api/')) {
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const isPublicPath = PUBLIC_PATHS.some(path => pathname === path || (path !== '/' && pathname.startsWith(path) && pathname.charAt(path.length) === '/'));

    if (payload) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // Proteger rutas de UI de administración
        if (pathname.startsWith('/dashboard/admin')) {
             await connectToDatabase();
             const user = await User.findById(payload.userId);
             if (!user || user.role !== 'admin') {
                 return NextResponse.redirect(new URL('/dashboard', request.url));
             }
        }
        
        return NextResponse.next();
    }

    if (!isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token');
        return response;
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
