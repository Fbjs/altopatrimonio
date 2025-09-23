
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
      return NextResponse.json({ isValid: false, message: 'Token no proporcionado.' }, { status: 400 });
    }

    const user = await User.findOne({ verificationQrCode: token });

    if (!user) {
      return NextResponse.json({ isValid: false, message: 'Token de verificación inválido o no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ isValid: true, message: 'Token válido.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error de validación de token:', error.message);
    return NextResponse.json({ isValid: false, message: 'Error interno del servidor.' }, { status: 500 });
  }
}
