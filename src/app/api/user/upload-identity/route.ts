
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { token, side, imageData } = await req.json();

    if (!token || !side || !imageData || !['front', 'back'].includes(side)) {
      return NextResponse.json({ message: 'Datos inválidos.' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ verificationQrCode: token });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado o token inválido.' }, { status: 404 });
    }
    
    const updateField = side === 'front' ? { idFrontImage: imageData } : { idBackImage: imageData };
    
    // Use findByIdAndUpdate to ensure we are updating the correct user found by the token
    await User.findByIdAndUpdate(user._id, updateField, { new: true });

    return NextResponse.json({ message: `Imagen del lado ${side} guardada con éxito.` }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar la imagen de identidad:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}

    