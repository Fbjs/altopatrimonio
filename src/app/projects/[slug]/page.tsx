
"use client";

import React, { useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Twitter, Linkedin, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


const project = {
  image: "https://placehold.co/800x600.png",
  hint: "modern building",
  title: "Leaseback Parcelas Pucón",
  tag: "Reparto mensual de utilidades",
  tagVariant: "secondary",
  raised: 471000000,
  goal: 471000000,
  term: "18 meses",
  annualizedReturn: "14%",
  minInvestment: 0,
  maxInvestment: 15000000,
  description: "El proyecto Leaseback Parcelas Pucón consiste en la adquisición de un portafolio de terrenos de alta plusvalía en la zona lacustre de Pucón. Mediante un contrato de leaseback, se arriendan los terrenos a la empresa vendedora por un plazo de 18 meses, generando un flujo de ingresos mensual para los inversionistas. Al final del período, la empresa tiene la opción de recompra, ofreciendo una atractiva rentabilidad total. Esta es una oportunidad de inversión inmobiliaria con bajo riesgo, respaldada por activos tangibles en una de las zonas de mayor desarrollo turístico de Chile.",
};

const investors = [
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Constructora INSATEC SpA" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
    { name: "Inversionista Anónimo" },
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
}

export default function ProjectDetailPage() {
  const [investmentAmount, setInvestmentAmount] = useState(project.maxInvestment);

  const expectedGain = investmentAmount * (parseFloat(project.annualizedReturn) / 100) * (parseInt(project.term) / 12);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto max-w-7xl py-12 sm:py-20">
          <div className="mb-8">
            <Link href="/#projects" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Volver a Proyectos
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    data-ai-hint={project.hint}
                  />
                  <div className="p-6">
                    <h1 className="font-headline text-3xl font-bold text-foreground">
                      {project.title}
                    </h1>
                    <Badge variant={project.tagVariant as any} className="mt-2 font-semibold">
                      {project.tag}
                    </Badge>
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
                     <div className="mt-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">Duración de la inversión: <span className="font-semibold text-foreground">{project.term}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8 shadow-lg">
                <CardContent className="p-6">
                  <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="description">Descripción</TabsTrigger>
                      <TabsTrigger value="investors">Inversionistas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                      <h3 className="font-headline text-xl font-semibold text-foreground">Detalles del Proyecto</h3>
                      <p className="mt-4 text-muted-foreground">{project.description}</p>
                    </TabsContent>
                    <TabsContent value="investors" className="mt-6">
                      <h3 className="font-headline text-xl font-semibold text-foreground">Inversionistas de la Ronda</h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {investors.map((investor, index) => (
                                <Card key={index} className="bg-secondary/50 p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-primary text-primary-foreground"><User className="h-5 w-5" /></AvatarFallback>
                                        </Avatar>
                                        <p className="font-medium text-foreground">{investor.name}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

            </div>
            <div className="lg:col-span-2">
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Simulador de Inversión</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Rentabilidad esperada</label>
                      <Tabs defaultValue="total" className="mt-2">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="total">Total</TabsTrigger>
                          <TabsTrigger value="anualizada">Anualizada</TabsTrigger>
                        </TabsList>
                        <TabsContent value="total" className="mt-4 text-center">
                            <p className="text-2xl font-bold text-primary">{((parseFloat(project.annualizedReturn) / 100) * (parseInt(project.term) / 12) * 100).toFixed(1)}%</p>
                        </TabsContent>
                        <TabsContent value="anualizada" className="mt-4 text-center">
                           <p className="text-2xl font-bold text-primary">{project.annualizedReturn}</p>
                        </TabsContent>
                      </Tabs>
                    </div>
                    <div>
                        <label htmlFor="investment-amount" className="text-sm font-medium text-muted-foreground">
                            Monto a invertir
                        </label>
                        <p id="investment-amount" className="mt-1 font-headline text-4xl font-bold text-foreground">
                           {formatCurrency(investmentAmount)}
                        </p>
                        <Slider
                            value={[investmentAmount]}
                            onValueChange={(value) => setInvestmentAmount(value[0])}
                            min={project.minInvestment}
                            max={project.maxInvestment}
                            step={100000}
                            className="mt-4"
                        />
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <span>{formatCurrency(project.minInvestment)}</span>
                            <span>{formatCurrency(project.maxInvestment)}</span>
                        </div>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">Ganancia esperada en {project.term}:</p>
                      <p className="font-headline text-3xl font-bold text-primary">{formatCurrency(expectedGain)}</p>
                    </div>
                    <Button size="lg" className="w-full text-lg">
                      ¡Quiero Invertir!
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
