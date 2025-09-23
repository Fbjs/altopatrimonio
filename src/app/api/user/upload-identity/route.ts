
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
    }

    const { side, imageData } = await req.json();

    if (!side || !imageData || !['front', 'back'].includes(side)) {
      return NextResponse.json({ message: 'Datos inválidos.' }, { status: 400 });
    }

    await connectToDatabase();
    
    const updateField = side === 'front' ? { idFrontImage: imageData } : { idBackImage: imageData };
    
    const user = await User.findByIdAndUpdate(userId, updateField, { new: true });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: `Imagen del lado ${side} guardada con éxito.` }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar la imagen de identidad:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
