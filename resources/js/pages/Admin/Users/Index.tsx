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
import { MoreHorizontal, Search, UserPlus2, Mail, Shield, Trash2, Eye, Edit2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    roles: { name: string }[];
    avatar: string | null;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
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
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

const roleColors: { [key: string]: string } = {
    admin: 'bg-red-500',
    editor: 'bg-blue-500',
    author: 'bg-green-500',
    user: 'bg-gray-500',
};

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/users',
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            router.delete(`/users/${id}`, {
                onSuccess: () => {
                    toast.success('Pengguna berhasil dihapus');
                },
                onError: () => {
                    toast.error('Gagal menghapus pengguna');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Pengguna</h1>
                        <p>Kelola pengguna dan hak akses mereka</p>
                    </div>
                    <Link href="/users/create">
                        <Button>
                            <UserPlus2 className="mr-2 h-4 w-4" />
                            Tambah Pengguna
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
                                    placeholder="Cari pengguna..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pengguna</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Peran</TableHead>
                                <TableHead className="w-[100px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {user.avatar ? (
                                                <img
                                                    src={`/storage/${user.avatar}`}
                                                    alt={user.name}
                                                    className="h-10 w-10 rounded-full object-cover ring-2"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm">Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {user.roles.map((role) => (
                                                <Badge
                                                    key={role.name}
                                                    className={`${roleColors[role.name.toLowerCase()] || 'bg-gray-500'}`}
                                                >
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/users/${user.id}`}
                                                        className="flex w-full items-center"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Lihat
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        className="flex w-full items-center"
                                                    >
                                                        <Edit2 className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(user.id)}
                                                    className="flex items-center"
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
                </div>

                <Pagination
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                />
            </div>
        </AppLayout>
    );
}
