
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire the cookie immediately
      path: '/',
    });

    return NextResponse.json({ message: 'Cierre de sesión exitoso.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
