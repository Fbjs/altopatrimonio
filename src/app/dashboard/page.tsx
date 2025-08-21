
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, TrendingUp, Briefcase, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import Link from 'next/link';

const summaryCards = [
    { title: "Total Invertido", value: "$0", description: "Total dinero invertido en la plataforma", icon: TrendingUp },
    { title: "Proyectos", value: "0", description: "Proyectos en los que se ha invertido", icon: Briefcase },
    { title: "Inversiones Completadas", value: "0", description: "Inversiones con pagos y documentación completa", icon: CheckCircle },
    { title: "Inversiones Pendientes", value: "0", description: "Pendiente de pagos o documentación", icon: Clock },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1.5">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
                            <AlertCircle className="h-5 w-5" />
                            ¡Completa tu verificación!
                            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">0 de 4 pasos</span>
                        </CardTitle>
                        <CardDescription>
                            Para poder invertir en nuestros proyectos inmobiliarios necesitamos verificar tu identidad. Comienza completando tu verificación.
                        </CardDescription>
                    </div>
                     <Button asChild>
                        <Link href="/dashboard/verification">Completar verificación</Link>
                    </Button>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((item, index) => {
                    const Icon = item.icon;
                    return (
                         <Card key={index} className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{item.value}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen de Inversiones</CardTitle>
                    <CardDescription>Visualiza y gestiona tus inversiones inmobiliarias</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="active">
                        <TabsList>
                            <TabsTrigger value="active">Activas</TabsTrigger>
                            <TabsTrigger value="archived">Archivadas</TabsTrigger>
                            <TabsTrigger value="finished">Finalizadas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="active" className="mt-6">
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Building2 className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">Sin Inversiones activas</h3>
                                <p className="mt-2 max-w-xs text-muted-foreground">Todavía no tienes inversiones activas. Explora los proyectos disponibles y comienza a invertir.</p>
                                <Button asChild className="mt-6">
                                    <Link href="/#projects">Ir a proyectos disponibles</Link>
                                </Button>
                            </div>
                        </TabsContent>
                         <TabsContent value="archived" className="mt-6">
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12 text-center">
                                <p className="text-muted-foreground">No tienes inversiones archivadas.</p>
                            </div>
                        </TabsContent>
                         <TabsContent value="finished" className="mt-6">
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-12 text-center">
                                <p className="text-muted-foreground">No tienes inversiones finalizadas.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
