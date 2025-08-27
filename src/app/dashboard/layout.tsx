
"use client";

import React, { type SVGProps, useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Sidebar,
    SidebarRoot,
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
import { Home, Briefcase, User, Settings, LifeBuoy, LogOut, Shield } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/hooks/use-toast";

type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error('No se pudo cargar el perfil del usuario');
        }
      } catch (error) {
        toast({
            title: "Error",
            description: "No se pudo cargar la información del perfil.",
            variant: "destructive",
        });
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [router, toast]);

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
    { href: "/dashboard/projects", icon: Briefcase, label: "Proyectos" },
  ];

  const adminMenuItems = [
    { href: "/dashboard/admin", icon: Shield, label: "Administración" },
  ];
  
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'No se pudo cerrar la sesión');
      }

      toast({
        title: "Sesión Cerrada",
        description: "Has cerrado sesión con éxito.",
      });
      router.push('/login');

    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });
    }
  };

  if (isLoading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Logo className="h-20 w-auto animate-pulse text-primary" />
          </div>
      )
  }

  return (
    <SidebarRoot>
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
                    {user?.role === 'admin' && adminMenuItems.map((item) => (
                         <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
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
                        <SidebarMenuButton asChild isActive={pathname === '/dashboard/support'}>
                            <Link href="/dashboard/support">
                                <LifeBuoy />
                                <span>Soporte</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout}>
                            <LogOut />
                            <span>Cerrar Sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
                <div className="flex items-center gap-4">
                     <SidebarTrigger className="md:hidden" />
                     <h2 className="text-xl font-semibold capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ') || 'Inicio'}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard/projects">¡Quiero Invertir!</Link>
                    </Button>
                    <Avatar>
                        <AvatarImage src={user?.avatar || undefined} alt={user?.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{user ? getInitials(user.name) : '...'}</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-secondary/30 p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarRoot>
  );
}
