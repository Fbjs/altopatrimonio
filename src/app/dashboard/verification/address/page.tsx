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

const addressFormSchema = z.object({
  street: z.string().min(5, { message: "La dirección es requerida." }),
  region: z.string({ required_error: "Por favor selecciona una región." }),
  commune: z.string({ required_error: "Por favor selecciona una comuna." }),
});

export default function AddressPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof addressFormSchema>>({
        resolver: zodResolver(addressFormSchema),
    });

    async function onSubmit(values: z.infer<typeof addressFormSchema>) {
        console.log(values)
        // Here you would typically save the data
        toast({
          title: "Datos de Dirección Guardados (Simulación)",
          description: "Tu dirección ha sido guardada.",
        });
        // router.push('/dashboard/verification/next-step');
    }
    
    return (
        <div className="w-full max-w-4xl mx-auto">
             <Link href="/dashboard/verification/personal-data" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">¿Cuál es tu dirección?</h1>
                <p className="text-muted-foreground">Esta información es necesaria para completar tu perfil</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                        <span className="text-sm font-medium text-muted-foreground">20% completado</span>
                    </div>
                    <Progress value={20} className="h-2" />
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle className="text-xl">Información de Dirección</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa tu dirección" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Región</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una región" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* Add regions here */}
                                                <SelectItem value="metropolitana">Región Metropolitana</SelectItem>
                                                <SelectItem value="valparaiso">Valparaíso</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="commune"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comuna</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch('region')}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una región primero" />
                                                </Trigger>
                                            </FormControl>
                                            <SelectContent>
                                                 {/* Add communes based on region */}
                                                <SelectItem value="santiago">Santiago</SelectItem>
                                                <SelectItem value="providencia">Providencia</SelectItem>
                                            </SelectContent>
                                        </Select>
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