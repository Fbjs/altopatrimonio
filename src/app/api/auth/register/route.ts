
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'El correo electrónico ya está en uso.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailVerificationToken = nanoid(32);
    
    // Asignar rol de admin si el email es el especificado
    const userRole = email === 'fibaceta.arce@gmail.com' ? 'admin' : 'user';

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken,
      role: userRole,
    });

    await newUser.save();

    // En un entorno real, enviarías el correo electrónico aquí.
    // Por ahora, lo mostraremos en la consola.
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/api/auth/verify/${emailVerificationToken}`;
    console.log(`Enlace de verificación para ${email}: ${verificationLink}`);


    return NextResponse.json({ message: 'Usuario creado con éxito. Por favor, verifica tu correo electrónico.' }, { status: 201 });
  } catch (error: any) {
    console.error('Error en el registro:', error.message);
    return NextResponse.json({ message: error.message || 'Error interno del servidor.' }, { status: 500 });
  }
}
