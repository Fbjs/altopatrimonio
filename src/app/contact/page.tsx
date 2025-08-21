"use client";

import React, { type SVGProps } from "react";
import Link from 'next/link';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Mensaje Enviado",
      description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
    });
    form.reset();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl py-20 sm:py-32">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl">Contáctanos</CardTitle>
              <CardDescription>
                ¿Tienes alguna pregunta? Completa el formulario y nuestro equipo se pondrá en contacto contigo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="juan.perez@email.com" {...field} />
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
                          <Textarea
                            placeholder="Escribe tu consulta aquí..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full text-lg">
                    Enviar Mensaje
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto text-primary" />
          <span className="font-headline text-3xl font-bold tracking-wide text-foreground">
            AltoPatrimonio
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-base md:flex">
          <Link href="/#projects" className="font-medium text-muted-foreground transition-colors hover:text-primary">Proyectos</Link>
          <Link href="/#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-primary">Cómo Funciona</Link>
          <Link href="/#education" className="font-medium text-muted-foreground transition-colors hover:text-primary">Aprende</Link>
        </nav>
        <Button size="lg" className="hidden md:flex" asChild>
            <Link href="/contact">Contáctanos</Link>
        </Button>
      </div>
    </header>
  );
}

function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 162 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M54 0L108 27V54L54 27V0Z" className="fill-primary" />
      <path d="M0 27L54 54V81L0 54V27Z" className="fill-primary" />
      <path d="M54 54L108 81V108L54 81V54Z" className="fill-primary" />
      <path d="M108 27L54 0V27L108 54V27Z" className="fill-current" />
      <path d="M54 54L0 27V54L54 81V54Z" className="fill-current" />
      <path d="M108 81L54 54V81L108 108V81Z" className="fill-current" />
    </svg>
  );
}

function Footer() {
    return (
        <footer className="border-t bg-card">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <Logo className="h-7 w-auto text-primary" />
                        <span className="font-headline text-2xl font-bold text-foreground">AltoPatrimonio</span>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AltoPatrimonio Invest. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-5">
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

    