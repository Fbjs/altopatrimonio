
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  emailVerified: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  const fetchUsers = useCallback(async (currentPage: number, currentSearch: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users?page=${currentPage}&limit=10&search=${currentSearch}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al cargar usuarios');
      }
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.total);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const debouncedFetch = useCallback(debounce(fetchUsers, 300), [fetchUsers]);

  useEffect(() => {
    debouncedFetch(page, search);
    return () => debouncedFetch.cancel();
  }, [page, search, debouncedFetch]);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error('No se pudo actualizar el rol');
      toast({ title: 'Éxito', description: 'Rol de usuario actualizado.' });
      fetchUsers(page, search); // Refresh
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo actualizar el rol.', variant: 'destructive' });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
       if (!res.ok) throw new Error('No se pudo eliminar el usuario');
      toast({ title: 'Éxito', description: 'Usuario eliminado correctamente.' });
      fetchUsers(1, ''); // Refresh and go to first page
      setPage(1);
      setSearch('');
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo eliminar el usuario.', variant: 'destructive' });
    } finally {
        setUserToDelete(null);
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <>
    <div className="space-y-8">
        <div>
            <h1 className="font-headline text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">Administra los usuarios de la plataforma.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Usuarios</CardTitle>
                <CardDescription>
                    Un total de {totalUsers} usuarios registrados.
                </CardDescription>
                 <div className="flex items-center justify-between pt-4">
                    <Input
                        placeholder="Buscar por nombre o email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset page on new search
                        }}
                        className="max-w-sm"
                    />
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Usuario
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="hidden md:table-cell">Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Registrado</TableHead>
                    <TableHead>
                        <span className="sr-only">Acciones</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                             <TableRow key={i}>
                                <TableCell colSpan={5} className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                                        <div className="w-full space-y-2">
                                            <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse"/>
                                            <div className="h-3 w-1/2 rounded-md bg-muted animate-pulse"/>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait"/>
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                        </Badge>
                        </TableCell>
                         <TableCell className="hidden md:table-cell">
                            <Badge variant={user.emailVerified ? "secondary" : "destructive"}>
                                {user.emailVerified ? "Verificado" : "No Verificado"}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                             <DropdownMenuSeparator />
                            {user.role === 'user' ? (
                                <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'admin')}>
                                    Hacer Administrador
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'user')}>
                                    Hacer Usuario
                                </DropdownMenuItem>
                            )}
                             <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setUserToDelete(user)}>
                                Eliminar
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
        <div className="flex justify-center items-center gap-4">
            <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
            </span>
            <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
            >
                Siguiente
            </Button>
        </div>
    </div>
     {userToDelete && (
        <AlertDialog open onOpenChange={() => setUserToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente la cuenta de{' '}
                    <span className="font-semibold">{userToDelete.name}</span> y borrará sus datos de nuestros servidores.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => handleDeleteUser(userToDelete._id)}
                    className="bg-destructive hover:bg-destructive/90"
                >
                    Eliminar
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}