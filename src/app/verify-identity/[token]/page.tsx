
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function VerifyIdentityPage() {
    const [isValidating, setIsValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <Card className="w-full max-w-sm p-8 shadow-none border-none">
                    <CardContent className="p-0">
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
                        
                        <Button size="lg" className="w-full mt-8 text-lg">
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
                    </CardContent>
                </Card>
            </main>
            <footer className="text-center p-4 text-xs text-muted-foreground">
                Motorizado por ⚡️ <span className="font-semibold">AiPrise</span>
            </footer>
        </div>
    );
}
