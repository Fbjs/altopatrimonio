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

    const body = await req.json();
    const { illicitActivities, politicallyExposed, fundOrigins } = body;

    if (illicitActivities === undefined || politicallyExposed === undefined || !fundOrigins) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { 
            regulatoryInfo: {
                illicitActivities,
                politicallyExposed,
                fundOrigins,
            }
         } },
        { new: true, upsert: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Información regulatoria actualizada con éxito.' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar la información regulatoria:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
