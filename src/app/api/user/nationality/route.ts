
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
    }

    const { hasChileanNationality } = await req.json();

    if (hasChileanNationality === undefined) {
      return NextResponse.json({ message: 'La nacionalidad es requerida.' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    if (!user.personalInfo) {
      user.personalInfo = {};
    }
    user.personalInfo.nationality = hasChileanNationality;
    
    await user.save();

    return NextResponse.json({ message: 'Nacionalidad actualizada con éxito.' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar la nacionalidad:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
