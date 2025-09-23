"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const nationalitySchema = z.object({
  hasChileanNationality: z.enum(['yes', 'no'], {
    required_error: "Debes seleccionar una opción.",
  }),
});

export default function NationalityPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof nationalitySchema>>({
        resolver: zodResolver(nationalitySchema),
    });

    async function onSubmit(values: z.infer<typeof nationalitySchema>) {
        try {
            const res = await fetch('/api/user/nationality', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hasChileanNationality: values.hasChileanNationality === 'yes' }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar la nacionalidad.');
            }
            toast({
              title: "Nacionalidad Guardada",
              description: "Has completado la información básica.",
            });
            // Final step, maybe redirect to verification overview or dashboard
            router.push('/dashboard/verification');
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

            <Link href="/dashboard/verification/marital-status" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">¿Cuál es tu nacionalidad?</h1>
                <p className="text-muted-foreground">Selecciona tu nacionalidad</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                        <span className="text-sm font-medium text-muted-foreground">80% completado</span>
                    </div>
                    <Progress value={80} className="h-2" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Nacionalidad</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                           <FormField
                                control={form.control}
                                name="hasChileanNationality"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormLabel>¿Tienes nacionalidad chilena?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                        >
                                        <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[:checked]:border-primary">
                                            <FormControl>
                                            <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            Sí
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[:checked]:border-primary">
                                            <FormControl>
                                            <RadioGroupItem value="no" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            No
                                            </FormLabel>
                                        </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex justify-end">
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Finalizando..." : "Finalizar"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
