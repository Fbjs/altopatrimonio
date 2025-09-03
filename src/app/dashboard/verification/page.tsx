
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ShieldCheck, FileText, Lock, QrCode, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const verificationSteps = [
    { 
        title: "Verificación de Identidad",
        description: "Confirma tu identidad de forma segura con tu documento.",
        statusText: "No se ha iniciado la verificación de identidad.",
        buttonText: "Completar",
        status: "active"
    },
    { 
        title: "Información básica",
        description: "Cuéntanos un poco sobre ti.",
        statusText: "Bloqueado",
        buttonText: "Bloqueado",
        status: "locked"
    },
    { 
        title: "Preguntas regulatorias",
        description: "Nos permite seguir los estándares de la CMF.",
        statusText: "Bloqueado",
        buttonText: "Bloqueado",
        status: "locked"
    },
    { 
        title: "Perfil de inversionista",
        description: "Ayúdanos a conocer tu estilo como inversor.",
        statusText: "Bloqueado",
        buttonText: "Bloqueado",
        status: "locked"
    },
];

const whyImportant = [
    {
        icon: FileText,
        title: "Requisito legal",
        description: "Debemos verificar tu identidad para cumplir con las regulaciones financieras vigentes."
    },
    {
        icon: ShieldCheck,
        title: "Integridad contractual",
        description: "Necesitamos confirmar que los contratos de inversión sean firmados por la persona correcta."
    },
    {
        icon: Lock,
        title: "Protección mutua",
        description: "La verificación protege tanto tus inversiones como a nuestra plataforma contra actividades fraudulentas."
    }
];

export default function VerificationPage() {
    return (
        <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver al Inicio
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h1 className="font-headline text-3xl font-bold">Completa tu cuenta</h1>
                        <p className="text-muted-foreground mt-1">Estás a pasos de empezar a invertir, solo te tomará algunos minutos.</p>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Pasos de verificación</h2>
                            <div className="flex items-center gap-4 mb-6">
                                <Progress value={0} className="h-2 w-full" />
                                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">0% completado</span>
                            </div>

                            <div className="space-y-4">
                                {verificationSteps.map((step, index) => {
                                    if (step.title === "Verificación de Identidad") {
                                        return (
                                            <Dialog key={index}>
                                                <Card 
                                                    className={cn(
                                                        "p-6",
                                                        step.status === 'active' && 'border-primary ring-1 ring-primary bg-primary/5',
                                                    )}
                                                >
                                                    <div className="flex items-start gap-6">
                                                        <div className={cn(
                                                            "flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold",
                                                             step.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
                                                        )}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                                            {step.status === 'active' && (
                                                                <p className="text-sm text-muted-foreground mt-2">{step.statusText}</p>
                                                            )}
                                                        </div>
                                                        <DialogTrigger asChild>
                                                            <Button>{step.buttonText}</Button>
                                                        </DialogTrigger>
                                                    </div>
                                                </Card>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle className="font-headline text-2xl flex items-center gap-2"><QrCode /> Verifica tu identidad</DialogTitle>
                                                        <DialogDescription>
                                                            Escanea el código QR con tu teléfono para continuar con la verificación de forma segura.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex flex-col items-center justify-center space-y-6 py-6">
                                                        <div className="rounded-lg border p-4 bg-white">
                                                            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://altopatrimonio.com/verify" alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">¿No puedes escanear? No te preocupes.</p>
                                                        <Button className="w-full">
                                                            <Smartphone className="mr-2 h-4 w-4" />
                                                            Continuar en el teléfono
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )
                                    }
                                    return (
                                        <Card 
                                            key={index}
                                            className={cn(
                                                "p-6",
                                                step.status === 'locked' && 'bg-secondary/50'
                                            )}
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold",
                                                    'bg-border text-muted-foreground'
                                                )}>
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                                </div>
                                                <Button disabled>
                                                    {step.buttonText}
                                                </Button>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4">¿Por qué es importante la verificación?</h2>
                            <ul className="space-y-6">
                                {whyImportant.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-1">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
