
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

// Helper function to check for admin role
const isAdmin = async (req: NextRequest): Promise<[boolean, NextResponse?]> => {
    const userId = req.headers.get('x-user-id');
    const userRole = req.headers.get('x-user-role');
    
    if (!userId || userRole !== 'admin') {
        return [false, NextResponse.json({ message: 'Acceso denegado: Se requiere rol de administrador' }, { status: 403 })];
    }
    
    // Optional: You might want to double-check against the DB
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
        return [false, NextResponse.json({ message: 'Acceso denegado: Se requiere rol de administrador' }, { status: 403 })];
    }
    return [true, undefined];
}


// Update user (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const [isAllowed, errorResponse] = await isAdmin(req);
  if (!isAllowed) {
    return errorResponse!;
  }
  
  try {
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
  const [isAllowed, errorResponse] = await isAdmin(req);
  if (!isAllowed) {
    return errorResponse!;
  }

  try {
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
