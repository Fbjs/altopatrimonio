
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail } from 'lucide-react';

const supportFormSchema = z.object({
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(20, { message: "El mensaje debe tener al menos 20 caracteres." }),
});

const faqs = [
  {
    question: "¿Cómo puedo invertir en un proyecto?",
    answer: "Para invertir, primero debes completar tu perfil y el proceso de verificación. Una vez aprobado, puedes navegar por los proyectos disponibles, seleccionar uno y seguir los pasos para invertir a través de nuestra plataforma segura."
  },
  {
    question: "¿Cuál es la inversión mínima?",
    answer: "La inversión mínima varía según el proyecto. Puedes encontrar esta información en la página de detalles de cada oportunidad de inversión."
  },
  {
    question: "¿Cómo recibo mis ganancias?",
    answer: "Las ganancias se distribuyen según la estructura de cada proyecto (mensual, trimestral, al finalizar). Los fondos se depositarán directamente en la cuenta bancaria que registraste en tu perfil."
  },
  {
    question: "¿Es segura mi inversión?",
    answer: "Todas las inversiones están respaldadas por activos inmobiliarios tangibles. Además, utilizamos tecnología de encriptación y seguimos estrictas regulaciones para proteger tu información y tus fondos."
  }
];

export default function SupportPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof supportFormSchema>>({
        resolver: zodResolver(supportFormSchema),
        defaultValues: {
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof supportFormSchema>) {
        console.log(values);
        toast({
          title: "Mensaje Enviado",
          description: "Gracias por contactarnos. Nuestro equipo de soporte se pondrá en contacto contigo pronto.",
        });
        form.reset();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Soporte</h1>
                <p className="text-muted-foreground mt-1">¿Necesitas ayuda? Encuentra respuestas aquí o contáctanos directamente.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preguntas Frecuentes (FAQ)</CardTitle>
                            <CardDescription>Encuentra respuestas rápidas a las preguntas más comunes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Enviar un Mensaje</CardTitle>
                            <CardDescription>Si no encuentras una respuesta, envíanos tu consulta.</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Asunto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: Consulta sobre el proyecto..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tu Mensaje</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe tu consulta en detalle aquí..." className="min-h-[150px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button type="submit">Enviar Mensaje</Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
                
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Información de Contacto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                                    <a href="mailto:soporte@altopatrimonio.com" className="font-semibold text-foreground hover:text-primary">soporte@altopatrimonio.com</a>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Teléfono</p>
                                    <a href="tel:+56212345678" className="font-semibold text-foreground hover:text-primary">+56 2 1234 5678</a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
