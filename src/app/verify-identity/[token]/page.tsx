
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ShieldCheck, Loader2, AlertTriangle, ArrowLeft, Camera, User, ChevronRight, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Validando tu sesión...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
                 <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h1 className="text-2xl font-bold mb-2">Error de Verificación</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => router.push('/')}>Volver al Inicio</Button>
            </div>
        );
    }
    
    const isCameraStep = step === 'camera';

    return (
        <div className={cn(
            "flex flex-col min-h-screen text-white",
            isCameraStep ? 'bg-black' : 'bg-gray-900'
        )}>
            <main className={cn(
                "flex-1 flex flex-col",
                !isCameraStep && 'items-center justify-center p-6'
            )}>
                {isCameraStep ? renderStep() : (
                    <Card className="w-full max-w-sm p-0 shadow-none border-none bg-transparent">
                        <CardContent className="p-0">
                           {renderStep()}
                        </CardContent>
                    </Card>
                )}
            </main>
            {!isCameraStep && (
                 <footer className="text-center p-4 text-xs text-muted-foreground">
                    Motorizado por ⚡️ <span className="font-semibold">AiPrise</span>
                </footer>
            )}
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
            <h1 className="font-headline text-3xl font-bold text-white">Verificación de identidad</h1>
            <p className="mt-2 text-gray-400">
                Su identidad será verificada usando un documento entregado por un país/autoridad
            </p>
            <Button size="lg" className="w-full mt-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onNext}>
                Comenzar
            </Button>
            <p className="mt-4 text-xs text-gray-500">
                Al continuar, aceptas los <Link href="/terms" className="font-semibold text-primary hover:underline">Términos y Condiciones</Link> y la <Link href="/privacy" className="font-semibold text-primary hover:underline">Política de Privacidad</Link> de nuestro proveedor
            </p>
            <div className="mt-8 space-y-4 text-sm">
                <Link href="#" className="block font-medium text-primary hover:underline">
                    ¿Quieres usar un dispositivo diferente?
                </Link>
                <div className="border-t border-gray-700 pt-4 space-y-4">
                    <Link href="#" className="flex items-center justify-center gap-2 text-gray-400 hover:text-primary">
                        <HelpCircle className="h-4 w-4" />
                        <span>¿Por qué se necesita esto?</span>
                    </Link>
                    <Button variant="ghost" className="text-xs text-gray-400 p-0 h-auto hover:bg-transparent hover:text-white">
                        Idioma: <span className="font-semibold text-white ml-1">Español</span>
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
                <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-800">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </header>
            
            <div className="space-y-6 px-4">
                <div>
                    <h2 className="text-sm font-medium text-gray-400 mb-2">País de origen del documento</h2>
                     <Button variant="outline" className="w-full justify-between h-12 text-base bg-gray-800 border-gray-700 hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                            <Image src="https://flagcdn.com/w40/cl.png" width={24} height={16} alt="Bandera de Chile"/>
                            <span>Chile</span>
                        </div>
                        <ChevronDown className="h-5 w-5 opacity-50"/>
                    </Button>
                </div>

                <div>
                    <h2 className="text-sm font-medium text-gray-400 mb-2">Escoja un tipo de documento</h2>
                     <button
                        onClick={onNext}
                        className="w-full flex items-center justify-between text-left p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors"
                     >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">Identificación Nacional</p>
                                <p className="text-sm text-gray-400">Identificación Nacional emitido por el gobierno</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-500" />
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
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: "environment" } 
                });
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
        toast({
            title: "Foto Capturada",
            description: "La foto de tu documento ha sido capturada (simulación)."
        })
    }
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative w-full h-screen flex flex-col">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <header className="flex items-center justify-between p-4">
                     <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10 rounded-full">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-semibold text-white absolute left-1/2 -translate-x-1/2">Frente de la Identificación Nacional</h1>
                </header>
                
                <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
                    <div className="relative w-full max-w-sm aspect-[1.586/1]">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <User className="w-24 h-24 text-white/50" />
                        </div>
                    </div>
                </div>

                <div className="z-10 flex items-center justify-around p-8 bg-black/50">
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="ghost" className="h-12 w-12 p-0 text-white" onClick={() => fileInputRef.current?.click()}>
                           <Upload className="h-7 w-7"/>
                        </Button>
                        <span className="text-sm font-medium">Cargar archivo</span>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                    </div>
                    <button
                        onClick={handleCapture}
                        disabled={!hasCameraPermission}
                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center ring-4 ring-white/50 disabled:opacity-50"
                        aria-label="Tomar foto"
                    >
                        <div className="w-[70px] h-[70px] rounded-full bg-white border-4 border-blue-600"></div>
                    </button>
                    <div className="w-12 h-12"></div>
                </div>

                 {hasCameraPermission === false && (
                    <div className="absolute bottom-32 left-4 right-4 z-20">
                        <Alert variant="destructive" className="bg-destructive/80 text-destructive-foreground border-none">
                            <AlertTitle>Se requiere acceso a la cámara</AlertTitle>
                            <AlertDescription>
                                Por favor, permite el acceso a la cámara para continuar con la verificación.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
        </div>
    );
}


    