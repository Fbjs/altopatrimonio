
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

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    user.personalInfo = {
      firstName: body.firstName,
      lastName: body.lastName,
      secondLastName: body.secondLastName,
      gender: body.gender,
      birthDate: body.birthDate,
      idExpiryDate: body.idExpiryDate,
    };
    
    await user.save();

    return NextResponse.json({ message: 'Datos personales actualizados con éxito.', user: user.personalInfo }, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar los datos personales:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
