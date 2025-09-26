import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  emailVerified: Date | null;
  emailVerificationToken?: string | null;
  verificationQrCode?: string;
  avatar?: string;
  role: 'user' | 'admin';
  settings?: {
    notifications: {
      opportunities: boolean;
      updates: boolean;
      newsletter: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: 'es' | 'en';
  };
  idFrontImage?: string;
  idBackImage?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    secondLastName?: string;
    gender: string;
    birthDate: Date;
    idExpiryDate: Date;
    maritalStatus?: string;
    nationality?: boolean;
  };
  address?: {
    street: string;
    region: string;
    commune: string;
  };
  phone?: string;
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
  verificationQrCode: {
    type: String,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  settings: {
    notifications: {
      opportunities: { type: Boolean, default: true },
      updates: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
    },
    theme: { type: String, default: 'system' },
    language: { type: String, default: 'es' },
  },
  idFrontImage: { type: String, select: false },
  idBackImage: { type: String, select: false },
  personalInfo: {
    type: {
      firstName: String,
      lastName: String,
      secondLastName: String,
      gender: String,
      birthDate: Date,
      idExpiryDate: Date,
      maritalStatus: String,
      nationality: Boolean,
    },
    default: {}
  },
  address: {
    type: {
        street: String,
        region: String,
        commune: String,
    },
    default: undefined
  },
  phone: {
      type: String,
  },
});

// We need to fetch the full user profile including personalInfo for verification status check
UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    // Ensure all necessary fields are included
    if (this.personalInfo) {
        userObject.personalInfo = this.personalInfo;
    }
    if (this.address) {
        userObject.address = this.address;
    }
    if (this.phone) {
        userObject.phone = this.phone;
    }
    return userObject;
};


export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
