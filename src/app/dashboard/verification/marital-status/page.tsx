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
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const maritalStatusOptions = [
  { label: "Soltero(a)", value: "single" },
  { label: "Casado(a)", value: "married" },
  { label: "Divorciado(a)", value: "divorced" },
  { label: "Separado(a)", value: "separated" },
  { label: "Conviviente", value: "cohabiting" },
  { label: "Viudo(a)", value: "widowed" },
];

const maritalStatusSchema = z.object({
  maritalStatus: z.string({
    required_error: "Por favor selecciona tu estado civil.",
  }),
});

export default function MaritalStatusPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof maritalStatusSchema>>({
        resolver: zodResolver(maritalStatusSchema),
    });

    async function onSubmit(values: z.infer<typeof maritalStatusSchema>) {
        try {
            const res = await fetch('/api/user/marital-status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error al guardar el estado civil.');
            }
            toast({
              title: "Estado Civil Guardado",
              description: "Tu información ha sido guardada con éxito.",
            });
            router.push('/dashboard/verification/nationality');
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

            <Link href="/dashboard/verification/phone" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </Link>
            
            <div className="space-y-4 mb-8">
                <h1 className="font-headline text-3xl font-bold">¿Cuál es tu estado civil?</h1>
                <p className="text-muted-foreground">Selecciona tu estado civil actual</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                        <span className="text-sm font-medium text-muted-foreground">60% completado</span>
                    </div>
                    <Progress value={60} className="h-2" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Estado Civil</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="maritalStatus"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Estado civil</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value
                                                ? maritalStatusOptions.find(
                                                    (status) => status.value === field.value
                                                )?.label
                                                : "Selecciona tu estado civil"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                        <Command>
                                            <CommandInput placeholder="Buscar estado civil..." />
                                            <CommandEmpty>No se encontró estado civil.</CommandEmpty>
                                            <CommandGroup>
                                            {maritalStatusOptions.map((status) => (
                                                <CommandItem
                                                value={status.label}
                                                key={status.value}
                                                onSelect={() => {
                                                    form.setValue("maritalStatus", status.value);
                                                }}
                                                >
                                                <Check
                                                    className={cn(
                                                    "mr-2 h-4 w-4",
                                                    status.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    )}
                                                />
                                                {status.label}
                                                </CommandItem>
                                            ))}
                                            </CommandGroup>
                                        </Command>
                                        </PopoverContent>
                                    </Popover>
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
