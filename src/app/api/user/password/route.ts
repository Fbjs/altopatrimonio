
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
    }
    
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'La contraseña actual es incorrecta.' }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: 'Contraseña actualizada con éxito.' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al cambiar la contraseña:', error.message);
    return NextResponse.json({ message: error.message || 'Error interno del servidor.' }, { status: 500 });
  }
}
