
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { nanoid } from 'nanoid';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
    }
    
    await connectToDatabase();
    
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    // Generate a new token if one doesn't exist
    if (!user.verificationQrCode) {
        user.verificationQrCode = nanoid(32);
        await user.save();
    }

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/verify-identity/${user.verificationQrCode}`;

    return NextResponse.json({ qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verificationUrl)}` });

  } catch (error: any) {
    console.error('Error al generar el QR de verificación:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
