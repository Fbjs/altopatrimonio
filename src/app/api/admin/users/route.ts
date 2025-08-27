
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

// GET all users (admin only)
export async function GET(req: NextRequest) {
  const [isAllowed, errorResponse] = await isAdmin(req);
  if (!isAllowed) {
    return errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';

    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    } : {};
    
    const users = await User.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return NextResponse.json({
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
