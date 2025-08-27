
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    await connectToDatabase();
    const token = params.token;

    if (!token) {
      return NextResponse.json({ message: 'Token no proporcionado.' }, { status: 400 });
    }

    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return NextResponse.json({ message: 'Token de verificación inválido o expirado.' }, { status: 400 });
    }

    user.emailVerified = new Date();
    user.emailVerificationToken = null;
    await user.save();

    // Redirigir al usuario a la página de inicio de sesión con un mensaje de éxito.
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('verified', 'true');
    return NextResponse.redirect(loginUrl);

  } catch (error: any) {
    console.error('Error de verificación:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
