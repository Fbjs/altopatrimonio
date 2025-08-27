
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

// Update user (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { role } = await req.json();

    if (!role || !['user', 'admin'].includes(role)) {
      return NextResponse.json({ message: 'Rol inválido' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuario actualizado con éxito', user });
  } catch (error: any) {
    console.error(`Error updating user ${params.id}:`, error.message);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// Delete user (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuario eliminado con éxito' });
  } catch (error: any) {
    console.error(`Error deleting user ${params.id}:`, error.message);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
