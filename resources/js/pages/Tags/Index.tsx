import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Tags } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Tag {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    tags: {
        data: Tag[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters?: {
        search: string;
    };
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tags',
        href: '/tags',
    },
];

export default function Index({ tags, filters = { search: '' } }: Props) {
    const [search, setSearch] = useState(filters.search);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/tags',
            { search: value },
            { preserveState: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tags" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <Link href="/tags/create">
                        <Button className="bg-white hover:bg-gray-200 text-black">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Tag
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Input
                                placeholder="Cari tag..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full text-gray-200 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg">
                    {tags.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border border-gray-800 rounded-lg">
                            <Tags className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-200 mb-1">Belum ada tag</h3>
                            <p className="text-gray-400 text-center mb-4">
                                {search
                                    ? 'Tidak ada tag yang sesuai dengan pencarian Anda'
                                    : 'Mulai dengan membuat tag untuk mengkategorikan konten Anda'}
                            </p>
                            <Link href="/tags/create">
                                <Button className="bg-white hover:bg-gray-100 text-black">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat Tag Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b">
                                    <TableHead className="text-gray-200">Nama</TableHead>
                                    <TableHead className="text-gray-200">Slug</TableHead>
                                    <TableHead className="text-gray-200">Deskripsi</TableHead>
                                    <TableHead className="text-gray-200">Warna</TableHead>
                                    <TableHead className="text-gray-200">Tanggal Dibuat</TableHead>
                                    <TableHead className="text-gray-200">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tags.data.map((tag) => (
                                    <TableRow key={tag.id} className="border-b border-gray-800 hover:bg-[#0c1015]">
                                        <TableCell className="text-gray-200">{tag.name}</TableCell>
                                        <TableCell className="text-gray-200">{tag.slug}</TableCell>
                                        <TableCell className="text-gray-200">{tag.description}</TableCell>
                                        <TableCell className="text-gray-200">
                                            <Badge
                                                style={{
                                                    backgroundColor: tag.color,
                                                    color: getContrastColor(tag.color),
                                                }}
                                            >
                                                {tag.color}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-200">
                                            {format(new Date(tag.created_at), 'dd MMMM yyyy', {
                                                locale: id,
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={`/tags/${tag.id}/edit`}>
                                                    <Button variant="outline" size="sm"
                                                        className="border-gray-800 text-gray-200 hover:bg-[#0c1015] hover:text-white">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/tags/${tag.id}`}>
                                                    <Button variant="outline" size="sm"
                                                        className="border-gray-800 text-gray-200 hover:bg-[#0c1015] hover:text-white">
                                                        Lihat
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Pagination */}
                {tags.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            {Array.from({ length: tags.last_page }, (_, i) => i + 1).map(
                                (page) => (
                                    <Link
                                        key={page}
                                        href={`/tags?page=${page}`}
                                        className={`px-3 py-1 rounded ${
                                            page === tags.current_page
                                                ? 'bg-white text-black'
                                                : 'bg-gray-800 text-gray-200 hover:bg-[#0c1015]'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// Helper function to get contrasting text color based on background color
function getContrastColor(hexColor: string): string {
    // Remove the hash if it exists
    const color = hexColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate the brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white based on brightness
    return brightness > 128 ? '#000000' : '#FFFFFF';
}
