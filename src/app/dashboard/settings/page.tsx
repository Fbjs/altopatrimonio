
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function SettingsPage() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Configuración Guardada",
            description: "Tus cambios se han guardado con éxito.",
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Configuración</h1>
                <p className="text-muted-foreground mt-1">Gestiona la configuración de tu cuenta y las preferencias del sitio.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Notificaciones</CardTitle>
                    <CardDescription>Elige cómo quieres que te notifiquemos sobre nuevas oportunidades y actualizaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="opportunities-email" className="font-semibold">Nuevas Oportunidades</Label>
                            <p className="text-sm text-muted-foreground">Recibe un correo cuando haya nuevos proyectos de inversión.</p>
                        </div>
                        <Switch id="opportunities-email" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="updates-email" className="font-semibold">Actualizaciones de Proyectos</Label>
                            <p className="text-sm text-muted-foreground">Recibe un correo sobre el progreso de tus inversiones.</p>
                        </div>
                        <Switch id="updates-email" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="newsletter-email" className="font-semibold">Boletín Mensual</Label>
                            <p className="text-sm text-muted-foreground">Mantente al día con noticias del mercado y de AltoPatrimonio.</p>
                        </div>
                        <Switch id="newsletter-email" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Idioma y Tema</CardTitle>
                    <CardDescription>Personaliza la apariencia y el idioma de la plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                             <Label htmlFor="language">Idioma</Label>
                             <Select defaultValue="es">
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Seleccionar idioma" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="en">Inglés</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Tema</Label>
                            <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                                <div>
                                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                    <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        <Sun className="mb-3 h-6 w-6" />
                                        Claro
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                    <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        <Moon className="mb-3 h-6 w-6" />
                                        Oscuro
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                    <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        <Monitor className="mb-3 h-6 w-6" />
                                        Sistema
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
