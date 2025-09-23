
"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ShieldCheck, Loader2, AlertTriangle, ArrowLeft, User, ChevronRight, Upload, CheckCircle, Sun, Layers } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type VerificationStep = 'welcome' | 'document-select' | 'camera' | 'preview' | 'uploading' | 'success';
type DocumentSide = 'front' | 'back';

export default function VerifyIdentityPage() {
    const [isValidating, setIsValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<VerificationStep>('welcome');
    const [documentSide, setDocumentSide] = useState<DocumentSide>('front');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const params = useParams();
    const token = params.token as string;
    const router = useRouter();

    const validateToken = useCallback(async () => {
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
    }, [token]);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    const handleNextStep = (nextStep: VerificationStep) => {
        setStep(nextStep);
    };

    const handleBackStep = (prevStep: VerificationStep) => {
        setStep(prevStep);
    }

    const handleDocumentSideChange = (side: DocumentSide) => {
        setDocumentSide(side);
    }
    
    const handleImageCapture = (image: string) => {
        setCapturedImage(image);
        setStep('preview');
    };

    const renderStep = () => {
        switch (step) {
            case 'welcome':
                return <WelcomeStep onNext={() => handleNextStep('document-select')} />;
            case 'document-select':
                return <DocumentSelectStep onBack={() => handleBackStep('welcome')} onNext={() => handleNextStep('camera')} />;
            case 'camera':
                return <CameraStep 
                            onBack={() => handleBackStep('document-select')} 
                            currentSide={documentSide} 
                            onImageCapture={handleImageCapture}
                        />;
            case 'preview':
                return <PreviewStep
                            image={capturedImage!}
                            documentSide={documentSide}
                            onRetake={() => setStep('camera')}
                            onConfirm={() => setStep('uploading')}
                        />;
            case 'uploading':
                return <UploadingState 
                            image={capturedImage!} 
                            documentSide={documentSide} 
                            token={token}
                            onSideChange={handleDocumentSideChange}
                            setStep={setStep}
                        />;
            case 'success':
                return <SuccessStep />;
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
    const isTransparentBg = isCameraStep || step === 'preview' || step === 'uploading' || step === 'success';

    return (
        <div className={cn(
            "flex flex-col min-h-screen text-white",
            isCameraStep ? 'bg-black' : 'bg-gray-900'
        )}>
            <main className={cn(
                "flex-1 flex flex-col",
                !isTransparentBg && 'items-center justify-center p-6'
            )}>
                 {isTransparentBg ? renderStep() : (
                    <Card className="w-full max-w-sm p-0 shadow-none border-none bg-transparent">
                        <CardContent className="p-0">
                        {renderStep()}
                        </CardContent>
                    </Card>
                 )}
            </main>
            {step === 'welcome' && (
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
            <header className="flex items-center mb-8 px-4">
                <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2 mr-2 hover:bg-gray-800 text-white">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </header>
            
            <div className="space-y-6 px-4">
                <div>
                    <h2 className="text-sm font-medium text-gray-400 mb-2">País de origen del documento</h2>
                     <Button variant="outline" className="w-full justify-between h-12 text-base bg-gray-800 border-gray-700 hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                            <Image src="https://flagcdn.com/w40/cl.png" width={24} height={16} alt="Bandera de Chile"/>
                            <span className="text-white">Chile</span>
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

function CameraStep({ onBack, currentSide, onImageCapture }: { onBack: () => void; currentSide: DocumentSide; onImageCapture: (image: string) => void; }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    const handleCapture = async () => {
        if (!videoRef.current) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        if (!context) return;
        
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onImageCapture(imageData);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const imageData = reader.result as string;
            onImageCapture(imageData);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="relative w-full h-screen flex flex-col">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <header className="flex items-center justify-center p-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="absolute left-4 top-4 text-white hover:bg-white/10 rounded-full">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-semibold text-white">
                        {currentSide === 'front' ? 'Frente de la Identificación Nacional' : 'Reverso de la Identificación Nacional'}
                    </h1>
                </header>
                
                <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
                    <div className="relative w-full max-w-sm aspect-[1.586/1]">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg" />
                    </div>
                </div>

                <div className="z-10 flex items-center justify-around p-8 bg-black/50">
                    <div className="flex flex-col items-center gap-2 w-20 text-center">
                        <Button variant="ghost" className="h-12 w-12 p-0 text-white" onClick={() => fileInputRef.current?.click()}>
                           <Upload className="h-7 w-7"/>
                        </Button>
                        <span className="text-xs font-medium">Cargar archivo</span>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>
                    <button
                        onClick={handleCapture}
                        disabled={hasCameraPermission === false}
                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center ring-4 ring-white/50 disabled:opacity-50"
                        aria-label="Tomar foto"
                    >
                        <div className="w-[70px] h-[70px] rounded-full bg-white border-4 border-blue-600"></div>
                    </button>
                    <div className="w-20 h-12"></div>
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

function PreviewStep({ image, documentSide, onRetake, onConfirm }: { image: string; documentSide: DocumentSide; onRetake: () => void; onConfirm: () => void; }) {
    return (
        <div className="flex flex-col h-screen w-full bg-gray-900">
            <header className="flex items-center p-4 z-10">
                <Button variant="ghost" size="icon" onClick={onRetake} className="text-white hover:bg-white/10 rounded-full">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold text-white text-center flex-1 -ml-10">
                    Revisar la foto {documentSide === 'front' ? 'frontal' : 'del reverso'}
                </h1>
            </header>

            <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-white">
                        <Sun className="h-5 w-5" />
                        <span>Buena iluminación</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white">
                        <Layers className="h-5 w-5" />
                        <span>Sin difuminación</span>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                
                <div className="rounded-lg overflow-hidden">
                    <Image src={image} alt="Vista previa del documento" width={400} height={252} className="w-full h-auto object-contain" />
                </div>
            </div>

            <div className="p-6 space-y-3">
                <Button size="lg" className="w-full text-lg bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onConfirm}>
                    Continuar con esta foto
                </Button>
                <Button size="lg" variant="ghost" className="w-full text-lg text-primary hover:text-primary" onClick={onRetake}>
                    Tomar foto de nuevo
                </Button>
            </div>
        </div>
    );
}


function UploadingState({ image, documentSide, token, onSideChange, setStep }: { image: string; documentSide: DocumentSide; token: string; onSideChange: (side: DocumentSide) => void; setStep: (step: VerificationStep) => void; }) {
    const { toast } = useToast();

    useEffect(() => {
        const upload = async () => {
            try {
                const res = await fetch('/api/user/upload-identity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, side: documentSide, imageData: image }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Error al subir la imagen.');
                }
                
                if (documentSide === 'front') {
                    toast({
                        title: "Frente Subido",
                        description: "La foto del frente de tu documento ha sido subida."
                    });
                    onSideChange('back');
                    setStep('camera');
                } else {
                    setStep('success');
                }
            } catch (error: any) {
                toast({
                    title: "Error de Subida",
                    description: error.message,
                    variant: "destructive",
                });
                setStep('camera'); // Return to camera on error
            }
        };

        upload();
    }, [image, documentSide, token, onSideChange, setStep, toast]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold">Subiendo...</p>
        </div>
    );
}

function SuccessStep() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
             <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h1 className="font-headline text-3xl font-bold text-white">¡Todo listo!</h1>
            <p className="mt-2 text-gray-400 max-w-sm">
                Ya puedes volver a tu computador para continuar con los siguientes pasos de la verificación.
            </p>
        </div>
    );
}


