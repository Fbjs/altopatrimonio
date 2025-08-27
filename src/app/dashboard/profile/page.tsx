
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
});

const passwordFormSchema = z.object({
    currentPassword: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    newPassword: z.string().min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres." }),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});


export default function ProfilePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
          name: "",
          email: "",
        },
    });

    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    useEffect(() => {
        async function fetchProfile() {
            try {
                setIsLoading(true);
                const res = await fetch('/api/user/profile');
                if (!res.ok) {
                    throw new Error('No se pudo cargar la información del perfil.');
                }
                const data = await res.json();
                profileForm.reset({ name: data.name, email: data.email });
                if (data.avatar) {
                    setAvatarPreview(data.avatar);
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, [profileForm, toast]);


    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        try {
            const payload = {
                ...values,
                avatar: avatarPreview,
            };
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al actualizar el perfil.');
            }
            toast({
                title: "Perfil Actualizado",
                description: "Tu información ha sido actualizada con éxito.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
        try {
            const res = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al cambiar la contraseña.');
            }
            toast({
                title: "Contraseña Cambiada",
                description: "Tu contraseña ha sido cambiada con éxito.",
            });
            passwordForm.reset();
        } catch (error: any) {
             toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    if (isLoading) {
        return <ProfilePageSkeleton />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Mi Perfil</h1>
                <p className="text-muted-foreground mt-1">Gestiona la información de tu cuenta y tu configuración de seguridad.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu foto de perfil y detalles personales.</CardDescription>
                </CardHeader>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} noValidate>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={avatarPreview || undefined} alt="User" data-ai-hint="person portrait"/>
                                    <AvatarFallback>{getInitials(profileForm.getValues("name") || "  ")}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                     <Button type="button" onClick={() => fileInputRef.current?.click()}>Cambiar Foto</Button>
                                     <Input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/png, image/jpeg, image/gif" className="hidden" />
                                     <p className="text-xs text-muted-foreground">JPG, GIF o PNG. Tamaño máximo de 800K.</p>
                                </div>
                            </div>
                            <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Tu nombre completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                    <Input type="email" placeholder="Tu correo electrónico" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                {profileForm.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
                    <CardDescription>Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura.</CardDescription>
                </CardHeader>
                 <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} noValidate>
                        <CardContent className="space-y-6">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña Actual</FormLabel>
                                    <FormControl>
                                    <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nueva Contraseña</FormLabel>
                                    <FormControl>
                                    <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                                    <FormControl>
                                    <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                             <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                                {passwordForm.formState.isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

function ProfilePageSkeleton() {
    return (
        <div className="space-y-8">
            <div>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-52" />
                    <Skeleton className="h-5 w-72" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                             <Skeleton className="h-10 w-28" />
                             <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-60" />
                    <Skeleton className="h-5 w-96" />
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-40" />
                </CardFooter>
            </Card>
        </div>
    )
}
