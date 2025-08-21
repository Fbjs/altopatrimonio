
"use client";

import React, { type SVGProps } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";


const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Cuenta Creada",
        description: "Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.",
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        title: "Error al crear la cuenta",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-md py-20 sm:py-32">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl">Crear Cuenta</CardTitle>
              <CardDescription>
                Únete a AltoPatrimonio y empieza a construir tu futuro financiero.
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
                          <Input type="email" placeholder="juan.perez@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full text-lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Creando cuenta...' : 'Crear mi Cuenta'}
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                ¿Ya tienes una cuenta? <Link href="/login" className="font-semibold text-primary hover:underline">Inicia Sesión</Link>
              </div>
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
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild>
              <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
    const { toast } = useToast();
    const [email, setEmail] = React.useState('');

    const handleSubscription = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast({
                title: "¡Suscripción Exitosa!",
                description: "Gracias por suscribirte a nuestro boletín.",
            });
            setEmail('');
        }
    };

    return (
        <footer className="border-t bg-card">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                      <div className="flex items-center gap-3">
                          <Logo className="h-7 w-auto text-primary" />
                          <span className="font-headline text-2xl font-bold text-foreground">AltoPatrimonio</span>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">Construyendo futuros a través de la inversión inmobiliaria inteligente.</p>
                      <div className="mt-6 flex items-center gap-5">
                          <Link href="#" aria-label="Twitter">
                              <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                          </Link>
                          <Link href="#" aria-label="LinkedIn">
                              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                          </Link>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-headline font-semibold text-foreground">Navegación</h4>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/#projects" className="hover:text-primary">Proyectos</Link></li>
                        <li><Link href="/#how-it-works" className="hover:text-primary">Cómo Funciona</Link></li>
                        <li><Link href="/#education" className="hover:text-primary">Aprende</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-foreground">Legal</h4>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/terms" className="hover:text-primary">Términos y Condiciones</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary">Política de Privacidad</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contacto</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-headline font-semibold text-foreground">Mantente Informado</h4>
                    <p className="mt-4 text-sm text-muted-foreground">Suscríbete a nuestro boletín para recibir las últimas noticias y oportunidades.</p>
                    <form onSubmit={handleSubscription} className="mt-4 flex w-full max-w-sm items-center space-x-2">
                        <Input 
                          type="email" 
                          placeholder="Tu correo electrónico" 
                          className="flex-1"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Button type="submit" className="transition-transform duration-200 active:scale-95">Suscribirse</Button>
                    </form>
                  </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AltoPatrimonio Invest. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
