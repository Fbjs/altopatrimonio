
"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";


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
    countdown: "1 día y 02:14:27 horas"
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

export default function ProjectsPage() {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
    }
    const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Proyectos Disponibles</h1>
                <p className="text-muted-foreground mt-1">Visualiza e invierte en oportunidades inmobiliarias.</p>
            </div>
            <Tabs defaultValue="active">
                <TabsList>
                    <TabsTrigger value="active">Activos</TabsTrigger>
                    <TabsTrigger value="in-progress">En Ejecución</TabsTrigger>
                    <TabsTrigger value="finished">Terminados</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project, index) => (
                        <Card key={index} className="group flex transform flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
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
                            <Button asChild className="mt-6 w-full text-lg font-bold">
                               <Link href={`/projects/${project.slug}`}>¿Quiero Invertir?</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                </TabsContent>
                <TabsContent value="in-progress" className="mt-6">
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12 text-center">
                        <p className="text-muted-foreground">No tienes proyectos en ejecución.</p>
                    </div>
                </TabsContent>
                <TabsContent value="finished" className="mt-6">
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12 text-center">
                        <p className="text-muted-foreground">No tienes proyectos terminados.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
