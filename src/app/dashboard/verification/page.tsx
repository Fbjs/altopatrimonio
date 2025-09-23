"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ShieldCheck, FileText, Lock, ChevronDown, HelpCircle, Loader2, CheckCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

type VerificationStepStatus = "completed" | "active" | "locked";

type VerificationStep = {
  id: string;
  title: string;
  description: string;
  statusText: string;
  buttonText: string;
  status: VerificationStepStatus;
  action?: () => void;
};

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

function WhyIsThisNeededDialog() {
    return (
        <DialogContent className="sm:max-w-sm p-8 text-center">
             <DialogHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="font-headline text-xl mt-4">¿Por qué se necesita esto?</DialogTitle>
             </DialogHeader>
            <DialogDescription className="text-base text-muted-foreground">
                La verificación de identidad es un proceso usado por negocios y organizaciones para verificar la identidad de sus clientes.
                <br /><br />
                Completar el proceso KYC es un paso importante mientras para establecer seguridad y confianza entre empresas y clientes.
            </DialogDescription>
        </DialogContent>
    );
}


function VerificationDialogContent({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchQrCode = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/user/verification-qr');
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'No se pudo generar el código QR.');
            }
            const data = await res.json();
            setQrUrl(data.qrUrl);
        } catch (err: any) {
            setError(err.message);
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);
    
    useEffect(() => {
        fetchQrCode();
    }, [fetchQrCode]);
    
    return (
        <DialogContent onOpenChange={onOpenChange} className="sm:max-w-md p-8">
            <DialogHeader className="text-center">
                <DialogTitle className="font-headline text-2xl">Verificación de identidad</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4 pt-4 min-h-[260px]">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Skeleton className="h-[200px] w-[200px] rounded-lg" />
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Generando código QR...</p>
                    </div>
                )}
                {error && !isLoading && (
                     <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-destructive">{error}</p>
                        <Button onClick={fetchQrCode} variant="link" className="mt-2">Reintentar</Button>
                    </div>
                )}
                {qrUrl && !isLoading && (
                    <>
                        <div className="rounded-lg border p-2 bg-white">
                            <Image src={qrUrl} alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-foreground">Continúa desde tu teléfono</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mt-1">Por favor, escanea este código QR para comenzar la verificación de tu identidad</p>
                        </div>
                    </>
                )}
            </div>
             <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                            <HelpCircle className="h-4 w-4 mr-1.5" />
                            ¿Por qué se necesita esto?
                        </Button>
                    </DialogTrigger>
                    <WhyIsThisNeededDialog />
                </Dialog>
                <Button variant="ghost" className="text-xs text-muted-foreground p-0 h-auto">
                    Idioma: <span className="font-semibold text-foreground ml-1">Español</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
            </div>
            <div className="text-center mt-2">
                <p className="text-xs text-muted-foreground">Motorizado por ⚡️ AiPrise</p>
            </div>
        </DialogContent>
    )
}

export default function VerificationPage() {
    const router = useRouter();
    const initialVerificationSteps: VerificationStep[] = [
        { 
            id: "identity",
            title: "Verificación de Identidad",
            description: "Confirma tu identidad de forma segura con tu documento.",
            statusText: "No se ha iniciado la verificación de identidad.",
            buttonText: "Completar",
            status: "active"
        },
        { 
            id: "basic_info",
            title: "Información básica",
            description: "Cuéntanos un poco sobre ti.",
            statusText: "Bloqueado",
            buttonText: "Bloqueado",
            status: "locked",
            action: () => router.push('/dashboard/verification/personal-data')
        },
        { 
            id: "regulatory_questions",
            title: "Preguntas regulatorias",
            description: "Nos permite seguir los estándares de la CMF.",
            statusText: "Bloqueado",
            buttonText: "Bloqueado",
            status: "locked"
        },
        { 
            id: "investor_profile",
            title: "Perfil de inversionista",
            description: "Ayúdanos a conocer tu estilo como inversor.",
            statusText: "Bloqueado",
            buttonText: "Bloqueado",
            status: "locked"
        },
    ];

    const [steps, setSteps] = useState<VerificationStep[]>(initialVerificationSteps);
    const [isPolling, setIsPolling] = useState(false);

    const updateVerificationStatus = useCallback(async () => {
        try {
            const res = await fetch('/api/user/profile');
            if (!res.ok) return;
            const user = await res.json();

            setSteps(prevSteps => {
                let newSteps = [...prevSteps];

                // Check Identity Verification
                const identityStepIndex = newSteps.findIndex(s => s.id === "identity");
                if (identityStepIndex !== -1 && newSteps[identityStepIndex].status !== 'completed' && user.idFrontImage && user.idBackImage) {
                    newSteps[identityStepIndex] = { ...newSteps[identityStepIndex], status: "completed", statusText: "Tu identidad ha sido verificada.", buttonText: "Completado" };
                    if (identityStepIndex + 1 < newSteps.length) {
                         newSteps[identityStepIndex + 1].status = "active";
                         newSteps[identityStepIndex + 1].buttonText = "Completar";
                    }
                    setIsPolling(false);
                } else if (newSteps[identityStepIndex].status === 'completed' && identityStepIndex + 1 < newSteps.length && newSteps[identityStepIndex + 1].status === 'locked') {
                    newSteps[identityStepIndex + 1].status = "active";
                    newSteps[identityStepIndex + 1].buttonText = "Completar";
                }

                // Check Basic Info Completion
                const basicInfoStepIndex = newSteps.findIndex(s => s.id === "basic_info");
                const isBasicInfoComplete = user.personalInfo?.nationality !== undefined && user.address && user.phone;
                if (basicInfoStepIndex !== -1 && newSteps[basicInfoStepIndex].status !== 'completed' && isBasicInfoComplete) {
                    newSteps[basicInfoStepIndex] = { ...newSteps[basicInfoStepIndex], status: "completed", statusText: "Completado", buttonText: "Completado" };
                    if (basicInfoStepIndex + 1 < newSteps.length) {
                         newSteps[basicInfoStepIndex + 1].status = "active";
                         newSteps[basicInfoStepIndex + 1].buttonText = "Completar";
                    }
                } else if (newSteps[basicInfoStepIndex].status === 'completed' && basicInfoStepIndex + 1 < newSteps.length && newSteps[basicInfoStepIndex + 1].status === 'locked') {
                    newSteps[basicInfoStepIndex + 1].status = "active";
                    newSteps[basicInfoStepIndex + 1].buttonText = "Completar";
                }
                
                return newSteps;
            });
        } catch (error) {
            console.error("Error al verificar el estado:", error);
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPolling) {
            interval = setInterval(() => {
                updateVerificationStatus();
            }, 3000); // Poll every 3 seconds
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPolling, updateVerificationStatus]);
    
    // Check status on initial load and when page gets focus
    useEffect(() => {
        updateVerificationStatus();
        window.addEventListener('focus', updateVerificationStatus);
        return () => {
            window.removeEventListener('focus', updateVerificationStatus);
        };
    }, [updateVerificationStatus]);


    const completedSteps = steps.filter(step => step.status === 'completed').length;
    const progress = (completedSteps / steps.length) * 100;


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
                                <Progress value={progress} className="h-2 w-full" />
                                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{progress.toFixed(0)}% completado</span>
                            </div>

                            <div className="space-y-4">
                                {steps.map((step, index) => {
                                    const isStepDisabled = step.status !== 'active';
                                    const CardComponent = (
                                         <Card 
                                            key={step.id}
                                            className={cn(
                                                "p-6",
                                                step.status === 'locked' && 'bg-secondary/50',
                                                step.status === 'active' && 'border-primary ring-1 ring-primary bg-primary/5',
                                                step.status === 'completed' && 'border-green-500 ring-1 ring-green-500 bg-green-500/5'
                                            )}
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold flex-shrink-0",
                                                     step.status === 'locked' && 'bg-border text-muted-foreground',
                                                     step.status === 'active' && 'bg-primary text-primary-foreground',
                                                     step.status === 'completed' && 'bg-green-600 text-white'
                                                )}>
                                                    {step.status === 'completed' ? <Check size={20} /> : index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    {step.status === 'completed' && (
                                                         <p className="text-sm mt-2 text-green-600 flex items-center gap-1"><CheckCircle size={16}/> {step.statusText}</p>
                                                    )}
                                                </div>
                                                <Button 
                                                    onClick={step.action}
                                                    disabled={isStepDisabled}
                                                    className={cn(step.status === 'completed' && 'bg-green-600 hover:bg-green-700')}
                                                >
                                                    {step.buttonText}
                                                </Button>
                                            </div>
                                        </Card>
                                    );

                                    if (step.id === "identity" && step.status === "active") {
                                        return (
                                            <Dialog key={step.id} onOpenChange={(open) => setIsPolling(open)}>
                                                 <DialogTrigger asChild>
                                                    {CardComponent}
                                                 </DialogTrigger>
                                                <VerificationDialogContent onOpenChange={(open) => setIsPolling(open)} />
                                            </Dialog>
                                        )
                                    }
                                    return <div key={step.id}>{CardComponent}</div>
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
