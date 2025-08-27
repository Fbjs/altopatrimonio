
"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';


const settingsFormSchema = z.object({
  notifications: z.object({
    opportunities: z.boolean(),
    updates: z.boolean(),
    newsletter: z.boolean(),
  }),
  language: z.enum(['es', 'en']),
  theme: z.enum(['light', 'dark', 'system']),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            notifications: {
                opportunities: true,
                updates: true,
                newsletter: false,
            },
            language: 'es',
            theme: 'system',
        },
    });

    useEffect(() => {
        async function fetchSettings() {
            try {
                setIsLoading(true);
                const res = await fetch('/api/user/settings');
                if (res.ok) {
                    const data = await res.json();
                    form.reset(data);
                } else {
                    throw new Error('No se pudo cargar la configuración.');
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
        fetchSettings();
    }, [form, toast]);


    async function onSubmit(values: SettingsFormValues) {
        try {
            const res = await fetch('/api/user/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar la configuración.');
            }
            toast({
                title: "Configuración Guardada",
                description: "Tus cambios se han guardado con éxito.",
            });
        } catch (error: any) {
             toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    if (isLoading) {
        return <SettingsPageSkeleton />;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Configuración</h1>
                    <p className="text-muted-foreground mt-1">Gestiona la configuración de tu cuenta y las preferencias del sitio.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Notificaciones</CardTitle>
                        <CardDescription>Elige cómo quieres que te notifiquemos sobre nuevas oportunidades y actualizaciones.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="notifications.opportunities"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel htmlFor="opportunities-email" className="font-semibold">Nuevas Oportunidades</FormLabel>
                                        <p className="text-sm text-muted-foreground">Recibe un correo cuando haya nuevos proyectos de inversión.</p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            id="opportunities-email"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notifications.updates"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel htmlFor="updates-email" className="font-semibold">Actualizaciones de Proyectos</FormLabel>
                                        <p className="text-sm text-muted-foreground">Recibe un correo sobre el progreso de tus inversiones.</p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            id="updates-email"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="notifications.newsletter"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel htmlFor="newsletter-email" className="font-semibold">Boletín Mensual</FormLabel>
                                        <p className="text-sm text-muted-foreground">Mantente al día con noticias del mercado y de AltoPatrimonio.</p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            id="newsletter-email"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Idioma y Tema</CardTitle>
                        <CardDescription>Personaliza la apariencia y el idioma de la plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                             <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Idioma</FormLabel>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar idioma" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="es">Español</SelectItem>
                                                <SelectItem value="en">Inglés</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Tema</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-3 gap-4"
                                            >
                                                <FormItem>
                                                     <FormControl>
                                                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                                     </FormControl>
                                                    <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        <Sun className="mb-3 h-6 w-6" />
                                                        Claro
                                                    </Label>
                                                </FormItem>
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                                     </FormControl>
                                                    <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        <Moon className="mb-3 h-6 w-6" />
                                                        Oscuro
                                                    </Label>
                                                </FormItem>
                                                 <FormItem>
                                                     <FormControl>
                                                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                                     </FormControl>
                                                    <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        <Monitor className="mb-3 h-6 w-6" />
                                                        Sistema
                                                    </Label>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                 <div className="flex justify-start">
                     <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}


function SettingsPageSkeleton() {
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
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-52" />
                    <Skeleton className="h-5 w-72" />
                </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                         <div className="space-y-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                             <Skeleton className="h-5 w-20" />
                            <div className="grid grid-cols-3 gap-4">
                                <Skeleton className="h-28 w-full" />
                                <Skeleton className="h-28 w-full" />
                                <Skeleton className="h-28 w-full" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        </div>
    )
}
