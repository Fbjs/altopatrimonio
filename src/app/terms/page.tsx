
"use client";

import React, { type SVGProps } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-20 sm:py-32">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl">Términos y Condiciones</CardTitle>
              <CardDescription>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
              <p>Por favor, lee estos términos y condiciones cuidadosamente antes de usar Nuestro Servicio.</p>
              
              <h2 className="font-headline text-2xl text-foreground mt-8">Interpretación y Definiciones</h2>
              <h3 className="font-headline text-xl text-foreground mt-4">Interpretación</h3>
              <p>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</p>
              
              <h3 className="font-headline text-xl text-foreground mt-4">Definiciones</h3>
              <p>A los efectos de estos Términos y Condiciones:</p>
              <ul>
                <li><strong>Compañía</strong> (referida como "la Compañía", "Nosotros", "Nos" o "Nuestro" en este Acuerdo) se refiere a AltoPatrimonio Invest.</li>
                <li><strong>Servicio</strong> se refiere al Sitio Web.</li>
                <li><strong>Términos y Condiciones</strong> (también referidos como "Términos") significan estos Términos y Condiciones que forman el acuerdo completo entre Tú y la Compañía con respecto al uso del Servicio.</li>
                <li><strong>Sitio web</strong> se refiere a AltoPatrimonio, accesible desde [URL del sitio web]</li>
                <li><strong>Tú</strong> significa la persona que accede o utiliza el Servicio, o la compañía u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio, según corresponda.</li>
              </ul>

              <h2 className="font-headline text-2xl text-foreground mt-8">Reconocimiento</h2>
              <p>Estos son los Términos y Condiciones que rigen el uso de este Servicio y el acuerdo que opera entre Tú y la Compañía. Estos Términos y Condiciones establecen los derechos y obligaciones de todos los usuarios con respecto al uso del Servicio.</p>
              <p>Tu acceso y uso del Servicio está condicionado a Tu aceptación y cumplimiento de estos Términos y Condiciones. Estos Términos y Condiciones se aplican a todos los visitantes, usuarios y otras personas que acceden o utilizan el Servicio.</p>
              <p>Al acceder o utilizar el Servicio, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos Términos y Condiciones, no podrás acceder al Servicio.</p>
              
              <h2 className="font-headline text-2xl text-foreground mt-8">Cuentas de Usuario</h2>
              <p>Cuando creas una cuenta con Nosotros, debes proporcionarnos información precisa, completa y actual en todo momento. El no hacerlo constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de Tu cuenta en Nuestro Servicio.</p>
              <p>Eres responsable de salvaguardar la contraseña que utilizas para acceder al Servicio y de cualquier actividad o acción bajo Tu contraseña, ya sea que Tu contraseña esté con Nuestro Servicio o con un Servicio de Redes Sociales de Terceros.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Terminación</h2>
              <p>Podemos terminar o suspender Tu cuenta inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluyendo, entre otros, si incumples estos Términos y Condiciones.</p>
              <p>Tras la terminación, Tu derecho a utilizar el Servicio cesará inmediatamente. Si deseas cancelar Tu cuenta, puedes simplemente dejar de usar el Servicio.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Ley Aplicable</h2>
              <p>Las leyes del País, excluyendo sus conflictos de normas legales, regirán estos Términos y Tu uso del Servicio. Tu uso de la Aplicación también puede estar sujeto a otras leyes locales, estatales, nacionales o internacionales.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Cambios a Estos Términos y Condiciones</h2>
              <p>Nos reservamos el derecho, a Nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, haremos esfuerzos razonables para proporcionar al menos 30 días de aviso antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material se determinará a Nuestra sola discreción.</p>

              <h2 className="font-headline text-2xl text-foreground mt-8">Contáctanos</h2>
              <p>Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos:</p>
              <ul>
                  <li>Por correo electrónico: <a href="mailto:legal@altopatrimonio.com" className="text-primary hover:underline">legal@altopatrimonio.com</a></li>
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
                    <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
                        <Input type="email" placeholder="Tu correo electrónico" className="flex-1" />
                        <Button type="submit">Suscribirse</Button>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AltoPatrimonio Invest. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
