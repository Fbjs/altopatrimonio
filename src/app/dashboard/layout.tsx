
"use client";

import React, { type SVGProps } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, User, Settings, LifeBuoy, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/logo";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
    { href: "/dashboard/projects", icon: Briefcase, label: "Proyectos" },
  ];

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Logo className="h-7 w-auto text-primary" />
                    <span className="font-headline text-2xl font-bold tracking-wide text-foreground">
                        AltoPatrimonio
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname === item.href}>
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/dashboard/profile'}>
                            <Link href="/dashboard/profile">
                                <User />
                                <span>Mi Perfil</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/dashboard/settings'}>
                            <Link href="/dashboard/settings">
                                <Settings />
                                <span>Configuración</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <LifeBuoy />
                            <span>Soporte</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <LogOut />
                                <span>Cerrar Sesión</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
                <div className="flex items-center gap-4">
                     <SidebarTrigger className="md:hidden" />
                     <h2 className="text-xl font-semibold">Dashboard</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard/projects">¡Quiero Invertir!</Link>
                    </Button>
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person portrait"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-secondary/30 p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
