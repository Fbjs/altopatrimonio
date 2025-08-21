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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  Users,
  ClipboardCheck,
  GitMerge,
  DollarSign,
  TrendingUp,
  Briefcase,
  Clock,
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
import { cn } from "@/lib/utils";

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

const projects = [
  {
    image: "https://placehold.co/600x400.png",
    hint: "mountain landscape",
    title: "Leaseback Parcelas Pucón",
    tag: "Reparto mensual de utilidades",
    tagVariant: "secondary",
    expectedReturn: "9%",
    term: "12 meses",
    minInvestment: "$15.000.000",
    raised: 20000000,
    goal: 171000000,
    countdown: "1 día y 02:14:27 horas"
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "green field",
    title: "Terreno San Carlos de Apoquindo",
    tag: "Plusvalía",
    tagVariant: "outline",
    expectedReturn: "9%",
    term: "12 meses",
    minInvestment: "$15.000.000",
    raised: 297000000,
    goal: 400000000,
    countdown: "4 días y 02:14:27 horas"
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "volcano landscape",
    title: "Estancia Rupanco Etapa II",
    tag: "Plusvalía",
    tagVariant: "outline",
    expectedReturn: "UF + 18%",
    term: "24 meses",
    minInvestment: "$15.000.000",
    raised: 428000000,
    goal: 445000000,
    countdown: "4 días y 02:14:27 horas"
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "modern apartment building",
    title: "Edificio Vista Montaña",
    tag: "Renta residencial",
    tagVariant: "secondary",
    expectedReturn: "UF + 8%",
    term: "36 meses",
    minInvestment: "$20.000.000",
    raised: 150000000,
    goal: 500000000,
    countdown: "10 días y 08:30:00 horas"
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "commercial office space",
    title: "Oficinas Corporativas El Golf",
    tag: "Renta comercial",
    tagVariant: "secondary",
    expectedReturn: "UF + 10%",
    term: "48 meses",
    minInvestment: "$25.000.000",
    raised: 300000000,
    goal: 600000000,
    countdown: "15 días y 12:00:00 horas"
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "warehouse logistics center",
    title: "Centro Logístico Ruta 5",
    tag: "Renta industrial",
    tagVariant: "secondary",
    expectedReturn: "UF + 12%",
    term: "60 meses",
    minInvestment: "$30.000.000",
    raised: 450000000,
    goal: 800000000,
    countdown: "20 días y 18:45:00 horas"
  }
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
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValuePropSection />
        <ImpactSection />
        <ProjectsSection onProjectInteract={handleProjectInteraction} />
        <HowItWorksSection />
        <TestimonialsSection />
        <EducationSection />
        <CtaSection ctaText={ctaText} isLoading={isLoadingCta} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-auto text-primary" />
          <span className="font-headline text-3xl font-bold tracking-wide text-foreground">
            AltoPatrimonio
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-base md:flex">
          <Link href="#projects" className="font-medium text-muted-foreground transition-colors hover:text-primary">Proyectos</Link>
          <Link href="#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-primary">Cómo Funciona</Link>
          <Link href="#education" className="font-medium text-muted-foreground transition-colors hover:text-primary">Aprende</Link>
        </nav>
        <Button size="lg" className="hidden md:flex">Contáctanos</Button>
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
      <path
        d="M54 0L108 27V54L54 27V0Z"
        className="fill-primary"
      />
      <path
        d="M0 27L54 54V81L0 54V27Z"
        className="fill-primary"
      />
      <path
        d="M54 54L108 81V108L54 81V54Z"
        className="fill-primary"
      />
      <path
        d="M108 27L54 0V27L108 54V27Z"
        className="fill-current"
      />
      <path
        d="M54 54L0 27V54L54 81V54Z"
        className="fill-current"
      />
      <path
        d="M108 81L54 54V81L108 108V81Z"
        className="fill-current"
      />
    </svg>
  );
}


function HeroSection() {
  return (
    <section className="py-24 text-center sm:py-40">
      <div className="container max-w-5xl">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl">
          Construye tu Futuro con Activos Tangibles
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          AltoPatrimonio te ofrece una forma segura y transparente de invertir en
          proyectos inmobiliarios seleccionados. Haz crecer tu patrimonio con nosotros.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild className="text-lg">
            <Link href="#projects">Explorar Proyectos</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg">
             <Link href="#how-it-works">Aprende Más</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ValuePropSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
            La Ventaja de AltoPatrimonio
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Estamos comprometidos a proporcionar una experiencia de inversión superior a través de nuestros principios fundamentales.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return(
              <div key={prop.title} className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{prop.title}</h3>
                <p className="mt-3 text-base text-muted-foreground">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-accent py-20 sm:py-24 text-accent-foreground">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:divide-x md:divide-border">
          {impactMetrics.map((metric, index) => (
            <div key={metric.label} className="flex flex-col items-center text-center">
              <metric.icon className="h-12 w-12 text-primary" />
              <p className="mt-4 font-headline text-6xl font-bold">{metric.value}</p>
              <p className="mt-2 text-base font-medium uppercase tracking-wider opacity-80">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onProjectInteract }: { onProjectInteract: () => void }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
  }

  return (
    <section id="projects" className="bg-background py-20 sm:py-32">
      <div className="container max-w-7xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
            Oportunidades de Inversión Destacadas
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Explora nuestros proyectos cuidadosamente seleccionados, cada uno con un potencial único de crecimiento y rentabilidad.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="group flex transform flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="relative p-0">
                <Badge variant="secondary" className="absolute left-4 top-4 z-10">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {project.countdown}
                </Badge>
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.hint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <h3 className="font-headline text-2xl font-bold text-foreground">{project.title}</h3>
                  <Badge variant={project.tagVariant as any} className="mt-2 font-semibold">{project.tag}</Badge>
                  
                  <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Rentabilidad total esperada</span>
                      <span className="font-bold text-primary">{project.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plazo de inversión</span>
                      <span className="font-semibold text-foreground">{project.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inversión mínima</span>
                      <span className="font-semibold text-foreground">{project.minInvestment}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Recaudado</span>
                      <span className="text-muted-foreground">A recaudar</span>
                    </div>
                    <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm font-semibold text-foreground">
                      <span>{formatCurrency(project.raised)} ({((project.raised / project.goal) * 100).toFixed(2)}%)</span>
                       <span>{formatCurrency(project.goal - project.raised)}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={onProjectInteract} className="mt-6 w-full text-lg font-bold">
                  ¡Quiero Invertir!
                </Button>
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
      <section id="how-it-works" className="py-20 sm:py-32 bg-card">
        <div className="container max-w-6xl">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
              Tu Viaje hacia la Inversión Inmobiliaria
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Invertir con nosotros es un proceso sencillo de cuatro pasos.
            </p>
          </div>
          <div className="relative mt-20">
             <div className="absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-0.5 -translate-x-1/2 bg-border md:block" aria-hidden="true"></div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
              {investmentSteps.map((step, index) => {
                const Icon = step.icon
                return(
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                      <div className="absolute -top-16 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-card ring-8 ring-card md:flex">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background">
                            <span className="font-headline text-2xl text-primary">{index + 1}</span>
                          </div>
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-base text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
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
          <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
            De Nuestros Inversionistas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Escucha lo que nuestra comunidad dice sobre su experiencia con AltoPatrimonio.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-16 w-full max-w-3xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="border-border bg-card p-8 shadow-lg md:p-12">
                  <CardContent className="p-0 text-center">
                    <div className="flex justify-center text-primary">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
                    </div>
                    <p className="mt-6 text-xl italic text-foreground">"{testimonial.quote}"</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://placehold.co/64x64.png?text=${testimonial.name.charAt(0)}`} alt={testimonial.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-headline text-xl font-bold text-foreground">{testimonial.name}</p>
                            <p className="text-base text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-16" />
          <CarouselNext className="-right-4 md:-right-16" />
        </Carousel>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="bg-card py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
            Portal de Educación Financiera
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Empodérate con conocimiento. Los inversores informados toman mejores decisiones.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {educationArticles.map((article) => (
            <Card key={article.title} className="group flex flex-col justify-between p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div>
                    <BookOpen className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="font-headline text-2xl font-semibold text-foreground">{article.title}</h3>
                    <p className="mt-3 text-base text-muted-foreground">{article.description}</p>
                </div>
                <Button variant="link" className="mt-6 justify-start p-0 text-base text-primary transition-all group-hover:gap-2">
                  Leer Artículo
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ ctaText, isLoading }: { ctaText: string, isLoading: boolean }) {
  return (
    <section className="bg-primary py-20 text-center sm:py-24">
      <div className="container max-w-4xl">
        <h2 className="font-headline text-4xl font-bold text-primary-foreground md:text-6xl">
          ¿Listo para Empezar a Construir tu Riqueza?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
          Únete a una comunidad de inversionistas expertos que están asegurando su futuro financiero con activos reales. Tu próxima gran inversión está a solo un clic de distancia.
        </p>
        <div className="mt-10">
            {isLoading ? (
                <Skeleton className="mx-auto h-14 w-56 bg-white/20" />
            ) : (
                <Button size="lg" variant="secondary" className="bg-accent text-lg font-bold text-accent-foreground hover:bg-accent/90">
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

    