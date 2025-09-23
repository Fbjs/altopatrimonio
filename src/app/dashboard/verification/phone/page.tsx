
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const phoneFormSchema = z.object({
  phone: z.string().min(8, { message: "El número de teléfono es requerido." }),
});

export default function PhonePage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof phoneFormSchema>>({
        resolver: zodResolver(phoneFormSchema),
    });

    async function onSubmit(values: z.infer<typeof phoneFormSchema>) {
        try {
            const fullPhoneNumber = `+56${values.phone}`;
            const res = await fetch('/api/user/phone', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: fullPhoneNumber }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar el número de teléfono.');
            }
            toast({
              title: "Número de Teléfono Guardado",
              description: "Tu número ha sido guardado con éxito.",
            });
            // router.push('/dashboard/verification/next-step');
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

            <Link href="/dashboard/verification/address" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">¿Cuál es tu número de teléfono?</h1>
                <p className="text-muted-foreground">Ingresa tu número de teléfono para poder contactarte</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                        <span className="text-sm font-medium text-muted-foreground">40% completado</span>
                    </div>
                    <Progress value={40} className="h-2" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Número de Teléfono</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de teléfono</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <div className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-background px-3">
                                                <Image src="https://flagcdn.com/w20/cl.png" width={20} height={15} alt="Bandera de Chile" />
                                                <span className="ml-2 text-sm">+56</span>
                                            </div>
                                            <Input 
                                                type="tel" 
                                                placeholder="9 1234 5678" 
                                                className="rounded-l-none"
                                                {...field} 
                                            />
                                        </div>
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground">Selecciona tu código de país y número de teléfono</p>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
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