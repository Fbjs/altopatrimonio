
"use client";

import React, { type SVGProps } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-20 sm:py-32">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl">Política de Privacidad</CardTitle>
              <CardDescription>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
              <p>Esta Política de Privacidad describe Nuestras políticas y procedimientos sobre la recopilación, uso y divulgación de Tu información cuando utilizas el Servicio y te informa sobre Tus derechos de privacidad y cómo la ley te protege.</p>
              <p>Utilizamos Tus datos personales para proporcionar y mejorar el Servicio. Al utilizar el Servicio, aceptas la recopilación y el uso de información de acuerdo con esta Política de Privacidad.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Recopilación y Uso de Tus Datos Personales</h2>
              <h3 className="font-headline text-xl text-foreground mt-4">Tipos de Datos Recopilados</h3>
              <h4>Datos Personales</h4>
              <p>Mientras utilizas Nuestro Servicio, podemos pedirte que nos proporciones cierta información de identificación personal que se puede utilizar para contactarte o identificarte. La información de identificación personal puede incluir, entre otros:</p>
              <ul>
                <li>Dirección de correo electrónico</li>
                <li>Nombre y apellido</li>
                <li>Número de teléfono</li>
                <li>Datos de uso</li>
              </ul>

              <h4>Datos de Uso</h4>
              <p>Los Datos de Uso se recopilan automáticamente cuando se utiliza el Servicio.</p>
              <p>Los Datos de Uso pueden incluir información como la dirección de Protocolo de Internet de Tu dispositivo (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visitas, la hora y fecha de tu visita, el tiempo dedicado a esas páginas, identificadores únicos de dispositivos y otros datos de diagnóstico.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Uso de Tus Datos Personales</h2>
              <p>La Compañía puede utilizar los Datos Personales para los siguientes propósitos:</p>
              <ul>
                <li><strong>Para proporcionar y mantener nuestro Servicio</strong>, incluido el seguimiento del uso de nuestro Servicio.</li>
                <li><strong>Para gestionar Tu Cuenta:</strong> para gestionar Tu registro como usuario del Servicio. Los Datos Personales que proporciones pueden darte acceso a diferentes funcionalidades del Servicio que están disponibles para ti como usuario registrado.</li>
                <li><strong>Para contactarte:</strong> Para contactarte por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica.</li>
                <li><strong>Para proporcionarte noticias,</strong> ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos.</li>
              </ul>

              <h2 className="font-headline text-2xl text-foreground mt-8">Seguridad de Tus Datos Personales</h2>
              <p>La seguridad de Tus Datos Personales es importante para Nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger Tus Datos Personales, no podemos garantizar su seguridad absoluta.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Privacidad de los Niños</h2>
              <p>Nuestro Servicio no se dirige a ninguna persona menor de 13 años. No recopilamos a sabiendas información de identificación personal de ninguna persona menor de 13 años.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Contáctanos</h2>
              <p>Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos:</p>
              <ul>
                  <li>Por correo electrónico: <a href="mailto:privacidad@altopatrimonio.com" className="text-primary hover:underline">privacidad@altopatrimonio.com</a></li>
                  <li>Visitando esta página en nuestro sitio web: <Link href="/contact" className="text-primary hover:underline">/contact</Link></li>
              </ul>
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
          <Image src="/logo.png" alt="AltoPatrimonio Logo" width={32} height={32} className="h-8 w-auto" />
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
                          <Image src="/logo.png" alt="AltoPatrimonio Logo" width={28} height={28} className="h-7 w-auto" />
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
