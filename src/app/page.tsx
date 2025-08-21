"use client";

import React, { useState, useEffect, type SVGProps } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Landmark,
  Users,
  ClipboardCheck,
  GitMerge,
  DollarSign,
  TrendingUp,
  Briefcase,
  Building2,
  KeyRound,
  Repeat,
  UserPlus,
  Search,
  HandCoins,
  LineChart,
  BookOpen,
  Star,
  Loader2,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getIntelligentCTA } from "@/ai/flows/intelligent-cta";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

const valueProps = [
  {
    icon: Users,
    title: "Inversión Accesible",
    description:
      "Comienza tu viaje de inversión con un monto mínimo, haciendo que los bienes raíces sean accesibles para todos.",
  },
  {
    icon: GitMerge,
    title: "Estrategia de Co-inversión",
    description:
      "Invierte junto a nosotros. Nuestro éxito está ligado al tuyo, asegurando intereses alineados y metas compartidas.",
  },
  {
    icon: ClipboardCheck,
    title: "Gestión Transparente",
    description:
      "Obtén visibilidad completa de tus inversiones con nuestro seguimiento detallado de proyectos e informes regulares.",
  },
];

const impactMetrics = [
  {
    icon: DollarSign,
    value: "$15M+",
    label: "Capital Recaudado",
  },
  {
    icon: TrendingUp,
    value: "$2M+",
    label: "Intereses Pagados a Inversores",
  },
  {
    icon: Briefcase,
    value: "50+",
    label: "Proyectos Gestionados",
  },
];

const projectTypes = [
  {
    image: "https://placehold.co/600x400.png",
    hint: "modern building",
    icon: Building2,
    title: "Desarrollos Inmobiliarios",
    description: "Financia nuevas construcciones desde cero y cosecha las recompensas del desarrollo.",
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "house keys",
    icon: KeyRound,
    title: "Oportunidades de Leaseback",
    description: "Compra propiedades y arriéndalas de nuevo a los propietarios originales para obtener ingresos estables a largo plazo.",
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "apartment building",
    icon: Repeat,
    title: "Proyectos de Alquiler",
    description: "Invierte en una cartera de propiedades de alquiler y obtén ingresos pasivos constantes.",
  },
];

const investmentSteps = [
  {
    icon: UserPlus,
    title: "Regístrate y Verifica",
    description: "Crea tu cuenta y completa un sencillo proceso de verificación.",
  },
  {
    icon: Search,
    title: "Selecciona un Proyecto",
    description: "Explora nuestra lista seleccionada de oportunidades de inversión y elige la que se ajuste a tus metas.",
  },
  {
    icon: HandCoins,
    title: "Invierte con Seguridad",
    description: "Realiza tu inversión a través de nuestra plataforma segura y recibe tu certificado digital.",
  },
  {
    icon: LineChart,
    title: "Obtén Rentabilidad",
    description: "Sigue el rendimiento de tu inversión y recibe tus ganancias a medida que el proyecto prospera.",
  },
];

const educationArticles = [
  {
    title: "Crowdfunding Inmobiliario 101",
    description: "Comprende los conceptos básicos de cómo funciona el crowdfunding inmobiliario.",
  },
  {
    title: "Beneficios y Riesgos de la Inversión Inmobiliaria",
    description: "Una visión equilibrada de qué esperar cuando inviertes en propiedades.",
  },
  {
    title: "Diversificando tu Portafolio con Bienes Raíces",
    description: "Aprende por qué los bienes raíces son un componente clave de una cartera de inversión saludable.",
  },
];

const testimonials = [
  {
    quote:
      "Los rendimientos mensuales constantes han sido una adición fantástica a mi cartera. La plataforma de AltoPatrimonio es transparente y fácil de usar.",
    name: "Carlos Velázquez",
    title: "Inversionista",
  },
  {
    quote:
      "Era nuevo en la inversión inmobiliaria, pero su equipo me guió en cada paso. La seguridad y el profesionalismo son de primera categoría.",
    name: "Sofía Rossi",
    title: "Inversionista",
  },
  {
    quote:
      "Ver crecer mi inversión a través de sus detalladas actualizaciones de proyectos es increíblemente tranquilizador. Una experiencia verdaderamente pasiva y rentable.",
    name: "Mateo Fernández",
    title: "Inversionista",
  },
];

export default function HomePage() {
  const [navigationPattern, setNavigationPattern] = useState("Visita inicial: El usuario acaba de llegar a la página.");
  const [ctaText, setCtaText] = useState("");
  const [isLoadingCta, setIsLoadingCta] = useState(true);

  const handleProjectInteraction = () => {
    setNavigationPattern("El usuario está navegando por los proyectos, mostrando interés en oportunidades de inversión.");
  };

  useEffect(() => {
    const fetchCta = async () => {
      setIsLoadingCta(true);
      try {
        const result = await getIntelligentCTA({ navigationPattern });
        setCtaText(result.cta);
      } catch (error) {
        console.error("Error al obtener el CTA inteligente:", error);
        setCtaText("Explorar Proyectos"); // Fallback CTA
      } finally {
        setIsLoadingCta(false);
      }
    };
    fetchCta();
  }, [navigationPattern]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImpactSection />
        <ValuePropSection />
        <ProjectsSection onProjectInteract={handleProjectInteraction} />
        <HowItWorksSection />
        <EducationSection />
        <TestimonialsSection />
        <CtaSection ctaText={ctaText} isLoading={isLoadingCta} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Landmark className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">
            AltoPatrimonio
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="#projects" className="font-medium text-muted-foreground transition-colors hover:text-primary">Proyectos</Link>
          <Link href="#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-primary">Cómo Funciona</Link>
          <Link href="#education" className="font-medium text-muted-foreground transition-colors hover:text-primary">Aprende</Link>
        </nav>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Contáctanos</Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-20 text-center sm:py-32">
      <div className="container max-w-4xl">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
          Construye tu Futuro con Activos Tangibles
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          AltoPatrimonio te ofrece una forma segura y transparente de invertir en
          proyectos inmobiliarios seleccionados. Haz crecer tu patrimonio con nosotros.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#projects">Explorar Proyectos</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
             <Link href="#how-it-works">Aprende Más</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <metric.icon className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-4 font-headline text-5xl font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            La Ventaja de AltoPatrimonio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Estamos comprometidos a proporcionar una experiencia de inversión superior a través de nuestros principios fundamentales.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return(
              <div key={prop.title} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-primary">{prop.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onProjectInteract }: { onProjectInteract: () => void }) {
  return (
    <section id="projects" className="bg-white py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Oportunidades de Inversión Destacadas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explora nuestros proyectos cuidadosamente seleccionados, cada uno con un potencial único de crecimiento y rentabilidad.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((project) => (
            <Card key={project.title} className="overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover"
                  data-ai-hint={project.hint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <project.icon className="mb-4 h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-2xl text-primary">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
                <Button onClick={onProjectInteract} className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">Aprende Más</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
    return (
      <section id="how-it-works" className="py-20 sm:py-32">
        <div className="container max-w-6xl">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              Tu Viaje hacia la Inversión Inmobiliaria
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Invertir con nosotros es un proceso sencillo de cuatro pasos.
            </p>
          </div>
          <div className="relative mt-16">
             <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" aria-hidden="true"></div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {investmentSteps.map((step, index) => {
                const Icon = step.icon
                return(
                  <div key={step.title} className="relative flex items-start gap-6">
                      <div className="absolute -left-[calc(50%-1.25rem)] top-1 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-background ring-4 ring-background md:flex lg:left-1/2 lg:-translate-x-1/2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background">
                            <span className="font-headline text-lg text-primary">{index + 1}</span>
                          </div>
                      </div>
                     <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-7 w-7 text-primary" />
                        </div>
                      <h3 className="mt-4 font-headline text-2xl font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-base text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

function EducationSection() {
  return (
    <section id="education" className="bg-white py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Portal de Educación Financiera
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Empodérate con conocimiento. Los inversores informados toman mejores decisiones.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {educationArticles.map((article) => (
            <Card key={article.title} className="flex flex-col justify-between p-6 shadow-lg">
                <div>
                    <BookOpen className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="font-headline text-2xl font-semibold text-primary">{article.title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{article.description}</p>
                </div>
                <Button variant="link" className="mt-4 p-0 text-accent hover:text-accent/80 justify-start">Leer Artículo &rarr;</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            De Nuestros Inversionistas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Escucha lo que nuestra comunidad dice sobre su experiencia con AltoPatrimonio.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-16 w-full max-w-2xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="border-2 border-accent/50 bg-white p-8 shadow-xl">
                  <CardContent className="p-0 text-center">
                    <div className="flex justify-center text-accent">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="mt-6 text-lg italic text-primary">"{testimonial.quote}"</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.name.charAt(0)}`} alt={testimonial.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

function CtaSection({ ctaText, isLoading }: { ctaText: string, isLoading: boolean }) {
  return (
    <section className="bg-primary py-20 text-center sm:py-24">
      <div className="container max-w-4xl">
        <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
          ¿Listo para Empezar a Construir tu Riqueza?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          Únete a una comunidad de inversionistas expertos que están asegurando su futuro financiero con activos reales. Tu próxima gran inversión está a solo un clic de distancia.
        </p>
        <div className="mt-8">
            {isLoading ? (
                <Skeleton className="mx-auto h-12 w-48" />
            ) : (
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {ctaText}
                </Button>
            )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Landmark className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">AltoPatrimonio</span>
                    </div>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AltoPatrimonio Invest. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
