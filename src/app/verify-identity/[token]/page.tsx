
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ShieldCheck, Loader2, AlertTriangle, ArrowLeft, Camera, User, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type VerificationStep = 'welcome' | 'document-select' | 'camera';

export default function VerifyIdentityPage() {
    const [isValidating, setIsValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<VerificationStep>('welcome');
    const params = useParams();
    const token = params.token as string;
    const router = useRouter();

    useEffect(() => {
        async function validateToken() {
            if (!token) {
                setError("Token de verificación no proporcionado.");
                setIsValidating(false);
                return;
            }

            try {
                const res = await fetch(`/api/auth/verify-token/${token}`);
                const data = await res.json();
                if (!res.ok || !data.valid) {
                    throw new Error(data.message || "Token inválido o expirado.");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsValidating(false);
            }
        }

        validateToken();
    }, [token]);

    const renderStep = () => {
        switch (step) {
            case 'welcome':
                return <WelcomeStep onNext={() => setStep('document-select')} />;
            case 'document-select':
                return <DocumentSelectStep onBack={() => setStep('welcome')} onNext={() => setStep('camera')} />;
            case 'camera':
                return <CameraStep onBack={() => setStep('document-select')} />;
        }
    };
    
    if (isValidating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Validando tu sesión...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
                 <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h1 className="text-2xl font-bold mb-2">Error de Verificación</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => router.push('/')}>Volver al Inicio</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <Card className="w-full max-w-sm p-0 shadow-none border-none">
                    <CardContent className="p-0">
                       {renderStep()}
                    </CardContent>
                </Card>
            </main>
            <footer className="text-center p-4 text-xs text-muted-foreground">
                Motorizado por ⚡️ <span className="font-semibold">AiPrise</span>
            </footer>
        </div>
    );
}


function WelcomeStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="text-center">
            <div className="flex justify-center items-center mb-8">
                <div className="relative flex justify-center items-center h-48 w-48">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse delay-200"></div>
                    <ShieldCheck className="relative h-20 w-20 text-primary" />
                </div>
            </div>
            <h1 className="font-headline text-3xl font-bold text-foreground">Verificación de identidad</h1>
            <p className="mt-2 text-muted-foreground">
                Su identidad será verificada usando un documento entregado por un país/autoridad
            </p>
            <Button size="lg" className="w-full mt-8 text-lg" onClick={onNext}>
                Comenzar
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
                Al continuar, aceptas los <Link href="/terms" className="font-semibold text-primary hover:underline">Términos y Condiciones</Link> y la <Link href="/privacy" className="font-semibold text-primary hover:underline">Política de Privacidad</Link> de nuestro proveedor
            </p>
            <div className="mt-8 space-y-4 text-sm">
                <Link href="#" className="block font-medium text-primary hover:underline">
                    ¿Quieres usar un dispositivo diferente?
                </Link>
                <div className="border-t pt-4 space-y-4">
                    <Link href="#" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                        <HelpCircle className="h-4 w-4" />
                        <span>¿Por qué se necesita esto?</span>
                    </Link>
                    <Button variant="ghost" className="text-xs text-muted-foreground p-0 h-auto">
                        Idioma: <span className="font-semibold text-foreground ml-1">Español</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function DocumentSelectStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
    return (
        <div className="text-left w-full">
            <header className="flex items-center mb-8">
                <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </header>
            
            <div className="space-y-6 px-4">
                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">País de origen del documento</h2>
                     <Button variant="outline" className="w-full justify-between h-12 text-base">
                        <div className="flex items-center gap-2">
                            <Image src="https://flagcdn.com/w40/cl.png" width={24} height={16} alt="Bandera de Chile"/>
                            <span>Chile</span>
                        </div>
                        <ChevronDown className="h-5 w-5 opacity-50"/>
                    </Button>
                </div>

                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Escoja un tipo de documento</h2>
                     <button
                        onClick={onNext}
                        className="w-full flex items-center justify-between text-left p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                     >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Identificación Nacional</p>
                                <p className="text-sm text-muted-foreground">Identificación Nacional emitido por el gobierno</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function CameraStep({ onBack }: { onBack: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error al acceder a la cámara:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Acceso a la cámara denegado',
                    description: 'Por favor, activa los permisos de la cámara en tu navegador.',
                });
            }
        };
        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [toast]);

    const handleCapture = () => {
        // Placeholder for capture logic
        toast({
            title: "Foto Capturada",
            description: "La foto de tu documento ha sido capturada (simulación)."
        })
    }

    return (
        <div className="text-left w-full">
            <header className="flex items-center mb-4">
                <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-semibold">Identificación Nacional</h1>
            </header>
            <div className="space-y-4 px-4">
                <p className="text-center text-muted-foreground">Asegúrate de que la parte frontal de tu documento esté completamente visible y legible.</p>

                <div className="w-full aspect-video rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                </div>
                
                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <AlertTitle>Se requiere acceso a la cámara</AlertTitle>
                        <AlertDescription>
                            Por favor, permite el acceso a la cámara para continuar con la verificación.
                        </AlertDescription>
                    </Alert>
                )}

                <Button size="lg" className="w-full text-lg" onClick={handleCapture} disabled={!hasCameraPermission}>
                    <Camera className="mr-2 h-5 w-5" />
                    Tomar foto
                </Button>
            </div>
        </div>
    );
}

