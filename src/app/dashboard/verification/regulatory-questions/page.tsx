"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const fundOrigins = [
  { id: "salary", label: "Honorarios/Sueldo" },
  { id: "investments", label: "Inversiones" },
  { id: "savings", label: "Ahorros" },
  { id: "inheritance", label: "Herencia" },
  { id: "other", label: "Otro" },
];

const regulatoryFormSchema = z.object({
  illicitActivities: z.enum(['yes', 'no'], {
    required_error: "Debes seleccionar una opción.",
  }),
  politicallyExposed: z.enum(['yes', 'no'], {
    required_error: "Debes seleccionar una opción.",
  }),
  fundOrigins: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un origen de fondos.",
  }),
});

export default function RegulatoryQuestionsPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof regulatoryFormSchema>>({
        resolver: zodResolver(regulatoryFormSchema),
        defaultValues: {
            fundOrigins: [],
        },
    });

    async function onSubmit(values: z.infer<typeof regulatoryFormSchema>) {
        try {
            const payload = {
                illicitActivities: values.illicitActivities === 'yes',
                politicallyExposed: values.politicallyExposed === 'yes',
                fundOrigins: values.fundOrigins,
            }
            const res = await fetch('/api/user/regulatory-info', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar las respuestas.');
            }
            toast({
              title: "Respuestas Guardadas",
              description: "Tu información regulatoria ha sido guardada.",
            });
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
             <Link href="/dashboard/verification" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver a verificación
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">Preguntas para cumplimiento regulatorio</h1>
                <p className="text-muted-foreground">Responde estas preguntas a conciencia, pueden ser revisadas por nuestro equipo de cumplimiento.</p>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle className="text-xl">Cuestionario</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="illicitActivities"
                                render={({ field }) => (
                                    <FormItem className="space-y-3 p-4 border rounded-md">
                                        <FormLabel>¿Vas a financiar actividades ilícitas?</FormLabel>
                                        <p className="text-sm text-muted-foreground">Actividades como terrorismo, proliferación de armas de destrucción masiva y/o lavado de dinero.</p>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                                    <FormLabel className="font-normal">Sí</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="politicallyExposed"
                                render={({ field }) => (
                                    <FormItem className="space-y-3 p-4 border rounded-md">
                                        <FormLabel>¿Eres una persona políticamente expuesta?</FormLabel>
                                        <p className="text-sm text-muted-foreground">Has ocupado o ocupas un cargo político importante, o eres familiar cercano de alguien que lo ha hecho.</p>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                                    <FormLabel className="font-normal">Sí</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fundOrigins"
                                render={() => (
                                    <FormItem className="p-4 border rounded-md">
                                        <div className="mb-4">
                                            <FormLabel className="text-base">¿Cuál es el origen de los fondos que invertirás en Somos Rentable?</FormLabel>
                                            <FormDescription>Puedes seleccionar más de una opción.</FormDescription>
                                        </div>
                                        {fundOrigins.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="fundOrigins"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
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