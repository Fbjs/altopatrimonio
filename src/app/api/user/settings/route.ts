
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
    
    const user = await User.findById(userId).select('settings');
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    return NextResponse.json(user.settings, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener la configuración:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    try {
      await connectToDatabase();
      const userId = req.headers.get('x-user-id');
  
      if (!userId) {
        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
      }
  
      const settings = await req.json();
  
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
      }

      // Merge settings to avoid overwriting nested objects completely
      user.settings = {
        ...user.settings,
        ...settings,
        notifications: {
          ...user.settings?.notifications,
          ...settings.notifications,
        },
      };
      
      await user.save();
  
      return NextResponse.json({ message: 'Configuración actualizada con éxito.', settings: user.settings }, { status: 200 });
    } catch (error: any) {
      console.error('Error al actualizar la configuración:', error.message);
      return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
    }
}
