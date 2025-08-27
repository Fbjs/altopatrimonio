
import { NextResponse, type NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ name: user.name, email: user.email, avatar: user.avatar }, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener el perfil:', error.message);
    return NextResponse.json({ message: error.message || 'Error interno del servidor.' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
    try {
      await connectToDatabase();
      const userId = req.headers.get('x-user-id');
  
      if (!userId) {
        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
      }
  
      const { name, email, avatar } = await req.json();
  
      if (!name || !email) {
        return NextResponse.json({ message: 'El nombre y el correo electrónico son obligatorios.' }, { status: 400 });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
      }
  
      // Verificar si el nuevo correo ya está en uso por otro usuario
      if (email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return NextResponse.json({ message: 'El correo electrónico ya está en uso.' }, { status: 409 });
        }
      }
  
      user.name = name;
      user.email = email;
      if (avatar) {
        user.avatar = avatar;
      }
      await user.save();
  
      return NextResponse.json({ message: 'Perfil actualizado con éxito.', user: { name: user.name, email: user.email, avatar: user.avatar } }, { status: 200 });
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error.message);
      return NextResponse.json({ message: error.message || 'Error interno del servidor.' }, { status: 500 });
    }
}
