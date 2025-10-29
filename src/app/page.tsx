
"use client";

import React, { useState, useEffect, useRef, type SVGProps } from "react";
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
import { Input } from "@/components/ui/input";
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
import Autoplay from "embla-carousel-autoplay";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useToast } from "@/hooks/use-toast";


const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};


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
    slug: "leaseback-parcelas-pucon",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "mountain landscape" },
        { src: "https://placehold.co/600x400.png", hint: "lake view" },
        { src: "https://placehold.co/600x400.png", hint: "forest trail" }
    ],
    title: "Leaseback Parcelas Pucón",
    tag: "Reparto mensual de utilidades",
    tagVariant: "secondary",
    expectedReturn: "9%",
    term: "12 meses",
    minInvestment: "$15.000.000",
    raised: 20000000,
    goal: 171000000,
    countdown: "46 día y 02:14:27 horas"
  },
  {
    slug: "terreno-san-carlos-de-apoquindo",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "green field" },
        { src: "https://placehold.co/600x400.png", hint: "city suburb" },
        { src: "https://placehold.co/600x400.png", hint: "modern house blueprints" }
    ],
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
    slug: "estancia-rupanco-etapa-ii",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "volcano landscape" },
        { src: "https://placehold.co/600x400.png", hint: "pristine lake" },
        { src: "https://placehold.co/600x400.png", hint: "aerial drone shot" }
    ],
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
    slug: "edificio-vista-montana",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "modern apartment building" },
        { src: "https://placehold.co/600x400.png", hint: "luxury apartment interior" },
        { src: "https://placehold.co/600x400.png", hint: "rooftop pool" }
    ],
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
    slug: "oficinas-corporativas-el-golf",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "commercial office space" },
        { src: "https://placehold.co/600x400.png", hint: "modern office lobby" },
        { src: "https://placehold.co/600x400.png", hint: "glass facade building" }
    ],
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
    slug: "centro-logistico-ruta-5",
    images: [
        { src: "https://placehold.co/600x400.png", hint: "warehouse logistics center" },
        { src: "https://placehold.co/600x400.png", hint: "loading dock" },
        { src: "https://placehold.co/600x400.png", hint: "trucks warehouse" }
    ],
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
  const [isPageLoading, setIsPageLoading] = useState(true);

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

  if (isPageLoading) {
    return <LoadingScreen onFinished={() => setIsPageLoading(false)} />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-x-hidden">
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

function HeroSection() {
  return (
    <section className="py-24 text-center sm:py-40 animate-fade-in-down">
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
  const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.2 });
  return (
    <section ref={ref} className={cn("bg-background py-20 sm:py-32 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10')}>
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
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return(
              <div key={prop.title} className={cn("flex flex-col items-center text-center transition-all duration-500 ease-out", isIntersecting ? 'opacity-100' : 'opacity-0')} style={{transitionDelay: `${index * 150}ms`}}>
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
    const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.3 });
  return (
    <section ref={ref} className={cn("bg-accent py-20 text-accent-foreground sm:py-24 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in opacity-100' : 'opacity-0')}>
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:divide-x md:divide-border">
          {impactMetrics.map((metric, index) => (
            <div key={metric.label} className={cn("flex flex-col items-center text-center transition-all duration-500 ease-out", isIntersecting ? 'opacity-100' : 'opacity-0')} style={{transitionDelay: `${index * 200}ms`}}>
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
  const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.1 });
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
  }
  const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section id="projects" ref={ref} className={cn("bg-background py-20 sm:py-32 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10')}>
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
            <Card key={index} className={cn("group flex transform flex-col overflow-hidden shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2", isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-95')} style={{transitionDelay: `${index * 150}ms`}}>
              <CardHeader className="relative p-0">
                <Badge variant="secondary" className="absolute left-4 top-4 z-10">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {project.countdown}
                </Badge>
                <Carousel className="w-full" plugins={[autoplay.current]} opts={{loop: true}}>
                    <CarouselContent>
                        {project.images.map((image, idx) => (
                            <CarouselItem key={idx}>
                                <div className="overflow-hidden rounded-t-lg">
                                    <Image
                                        src={image.src}
                                        alt={project.title}
                                        width={600}
                                        height={400}
                                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        data-ai-hint={image.hint}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
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
                      <span className="text-muted-foreground">Faltante</span>
                    </div>
                    <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm font-semibold text-foreground">
                      <span>{formatCurrency(project.raised)} ({((project.raised / project.goal) * 100).toFixed(0)}%)</span>
                       <span>{formatCurrency(project.goal - project.raised)}</span>
                    </div>
                  </div>
                </div>
                <Button asChild onClick={onProjectInteract} className="mt-6 w-full text-lg font-bold">
                  <Link href={`/projects/${project.slug}`}>¿Quiero Invertir?</Link>
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
    const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.2 });
    return (
      <section id="how-it-works" ref={ref} className={cn("py-20 sm:py-32 bg-card transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10')}>
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
                  <div key={step.title} className={cn("relative flex flex-col items-center text-center transition-all duration-500 ease-out", isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90')} style={{transitionDelay: `${index * 150}ms`}}>
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
  const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.1 });
  return (
    <section ref={ref} className={cn("py-20 sm:py-32 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10')}>
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
  const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.2 });
  return (
    <section id="education" ref={ref} className={cn("bg-card py-20 sm:py-32 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10')}>
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
          {educationArticles.map((article, index) => (
            <Card key={article.title} className={cn("group flex flex-col justify-between p-8 shadow-lg transition-all duration-500 ease-out hover:shadow-xl", isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-95')} style={{transitionDelay: `${index * 150}ms`}}>
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
  const [ref, isIntersecting] = useAnimateOnScroll({ threshold: 0.3 });
  const getButtonLink = () => {
    if (isLoading) return "#";
    return ctaText.toLowerCase().includes("reunión") ? "/contact" : "/#projects";
  };

  return (
    <section ref={ref} className={cn("bg-primary py-20 text-center text-primary-foreground sm:py-24 transition-all duration-700 ease-out", isIntersecting ? 'animate-fade-in opacity-100' : 'opacity-0')}>
      <div className="container max-w-4xl">
        <h2 className="font-headline text-4xl font-bold md:text-6xl">
          ¿Listo para Empezar a Construir tu Riqueza?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
          Únete a una comunidad de inversionistas expertos que están asegurando su futuro financiero con activos reales. Tu próxima gran inversión está a solo un clic de distancia.
        </p>
        <div className="mt-10">
            {isLoading ? (
                <Skeleton className="mx-auto h-14 w-56 bg-white/20" />
            ) : (
                <Button size="lg" variant="secondary" asChild className="bg-background text-lg font-bold text-primary hover:bg-background/90">
                    <Link href={getButtonLink()}>{ctaText}</Link>
                </Button>
            )}
        </div>
      </div>
    </section>
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
