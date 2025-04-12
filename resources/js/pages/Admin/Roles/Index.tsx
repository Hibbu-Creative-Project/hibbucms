import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, ShieldPlus, Users2, Shield, Trash2, Edit2, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    users_count: number;
    created_at: string;
}

interface Props {
    roles: {
        data: Role[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Roles',
        href: '/admin/roles',
    },
];

export default function Index({ roles, filters }: Props) {
    const [search, setSearch] = useState(filters.search);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/admin/roles',
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus peran ini?')) {
            router.delete(`/admin/roles/${id}`, {
                onSuccess: () => {
                    toast.success('Peran berhasil dihapus');
                },
                onError: () => {
                    toast.error('Gagal menghapus peran');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Peran</h1>
                        <p>Kelola peran dan izin pengguna</p>
                    </div>
                    <Link href="/admin/roles/create">
                        <Button>
                            <ShieldPlus className="mr-2 h-4 w-4" />
                            Tambah Peran
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg shadow border">
                    <div className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    type="text"
                                    placeholder="Cari peran..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>

                    {roles.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <Shield className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-1">Belum ada peran</h3>
                            <p className="text-center mb-4">
                                {search
                                    ? 'Tidak ada peran yang sesuai dengan pencarian Anda'
                                    : 'Mulai dengan membuat peran baru untuk mengatur akses pengguna'}
                            </p>
                            <Link href="/admin/roles/create">
                                <Button>
                                    <ShieldPlus className="mr-2 h-4 w-4" />
                                    Buat Peran Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Peran</TableHead>
                                    <TableHead>Izin</TableHead>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.data.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-gray-200">
                                                    <Shield className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{role.name}</div>
                                                    <div className="text-sm">
                                                        Dibuat {new Date(role.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.slice(0, 3).map((permission) => (
                                                    <Badge
                                                        key={permission.id}
                                                        variant="secondary"
                                                    >
                                                        <Lock className="h-3 w-3 mr-1" />
                                                        {permission.name}
                                                    </Badge>
                                                ))}
                                                {role.permissions.length > 3 && (
                                                    <Badge
                                                        variant="secondary"
                                                    >
                                                        +{role.permissions.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Users2 className="h-4 w-4" />
                                                {role.users_count} pengguna
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/admin/roles/${role.id}/edit`}
                                                            className="flex w-full items-center"
                                                        >
                                                            <Edit2 className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(role.id)}
                                                        className="flex items-center text-red-500 hover:text-red-400"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {roles.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            {Array.from({ length: roles.last_page }, (_, i) => i + 1).map(
                                (page) => {
                                    const queryParams = new URLSearchParams({
                                        page: page.toString(),
                                        search,
                                    }).toString();

                                    return (
                                        <Link
                                            key={`page-${page}`}
                                            href={`/admin/roles?${queryParams}`}
                                            className={`px-3 py-1 rounded ${
                                                page === roles.current_page
                                                    ? 'bg-white text-black'
                                                    : 'bg-gray-800 text-gray-200 hover:bg-[#0c1015]'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
