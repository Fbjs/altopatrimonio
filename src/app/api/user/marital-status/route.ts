
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

    const { maritalStatus } = await req.json();

    if (!maritalStatus) {
      return NextResponse.json({ message: 'Estado civil es requerido.' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { 'personalInfo.maritalStatus': maritalStatus } },
        { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Estado civil actualizado con éxito.' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar el estado civil:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
