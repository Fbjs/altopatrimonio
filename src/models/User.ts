import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  emailVerified: Date | null;
  emailVerificationToken?: string | null;
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
});

export default models.User || mongoose.model<IUser>('User', UserSchema);
