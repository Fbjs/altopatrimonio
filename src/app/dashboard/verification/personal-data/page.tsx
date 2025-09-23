
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const personalDataFormSchema = z.object({
  firstName: z.string().min(2, { message: "El nombre es requerido." }),
  lastName: z.string().min(2, { message: "El primer apellido es requerido." }),
  secondLastName: z.string().optional(),
  gender: z.string({ required_error: "Por favor selecciona tu sexo." }),
  birthDay: z.string().min(1, "DD").max(2),
  birthMonth: z.string().min(1, "MM").max(2),
  birthYear: z.string().min(4, "YYYY").max(4),
  expiryDay: z.string().min(1, "DD").max(2),
  expiryMonth: z.string().min(1, "MM").max(2),
  expiryYear: z.string().min(4, "YYYY").max(4),
});


export default function PersonalDataPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof personalDataFormSchema>>({
        resolver: zodResolver(personalDataFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            secondLastName: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            expiryDay: "",
            expiryMonth: "",
            expiryYear: "",
        },
    });

    async function onSubmit(values: z.infer<typeof personalDataFormSchema>) {
        try {
            const birthDate = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;
            const idExpiryDate = `${values.expiryYear}-${values.expiryMonth}-${values.expiryDay}`;

            const res = await fetch('/api/user/personal-data', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    birthDate: new Date(birthDate).toISOString(),
                    idExpiryDate: new Date(idExpiryDate).toISOString(),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar los datos.');
            }
            toast({
              title: "Datos Guardados",
              description: "Tu información personal ha sido guardada.",
            });
            router.push('/dashboard/verification/address');
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    }
    
    return (
        <div className="w-full max-w-4xl mx-auto">
             <Link href="/dashboard/verification" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver a verificación
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">Datos Personales</h1>
                <p className="text-muted-foreground">Por favor proporciona tus datos personales correctamente</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                        <span className="text-sm font-medium text-muted-foreground">0% completado</span>
                    </div>
                    <Progress value={0} className="h-2" />
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle className="text-xl">Información Personal</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa tus nombres" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primer apellido</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa tu primer apellido" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="secondLastName"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Segundo apellido</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa tu segundo apellido" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sexo</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una opción" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Masculino</SelectItem>
                                                    <SelectItem value="female">Femenino</SelectItem>
                                                    <SelectItem value="other">Otro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormItem>
                                    <FormLabel>Fecha de nacimiento</FormLabel>
                                    <div className="flex gap-2">
                                        <FormField control={form.control} name="birthDay" render={({ field }) => (<Input placeholder="DD" {...field} />)} />
                                        <FormField control={form.control} name="birthMonth" render={({ field }) => (<Input placeholder="MM" {...field} />)} />
                                        <FormField control={form.control} name="birthYear" render={({ field }) => (<Input placeholder="YYYY" {...field} />)} />
                                    </div>
                                    <FormMessage>{form.formState.errors.birthDay?.message || form.formState.errors.birthMonth?.message || form.formState.errors.birthYear?.message}</FormMessage>
                                </FormItem>
                                 <FormItem>
                                    <FormLabel>Fecha de vencimiento carnet</FormLabel>
                                    <div className="flex gap-2">
                                        <FormField control={form.control} name="expiryDay" render={({ field }) => (<Input placeholder="DD" {...field} />)} />
                                        <FormField control={form.control} name="expiryMonth" render={({ field }) => (<Input placeholder="MM" {...field} />)} />
                                        <FormField control={form.control} name="expiryYear" render={({ field }) => (<Input placeholder="YYYY" {...field} />)} />
                                    </div>
                                     <FormMessage>{form.formState.errors.expiryDay?.message || form.formState.errors.expiryMonth?.message || form.formState.errors.expiryYear?.message}</FormMessage>
                                </FormItem>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Guardando..." : "Continuar"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
