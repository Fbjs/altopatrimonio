import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  emailVerified: Date | null;
  emailVerificationToken?: string | null;
  avatar?: string;
  settings?: {
    notifications: {
      opportunities: boolean;
      updates: boolean;
      newsletter: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: 'es' | 'en';
  };
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Por favor, introduce un nombre.'],
  },
  email: {
    type: String,
    required: [true, 'Por favor, introduce un correo electrónico.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor, introduce un correo electrónico válido.'],
  },
  password: {
    type: String,
    required: [true, 'Por favor, introduce una contraseña.'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres.'],
    select: false, // No devolver la contraseña en las consultas por defecto
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  emailVerificationToken: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  settings: {
    notifications: {
      opportunities: { type: Boolean, default: true },
      updates: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
    },
    theme: { type: String, default: 'system' },
    language: { type: String, default: 'es' },
  }
});

export default models.User || mongoose.model<IUser>('User', UserSchema);
