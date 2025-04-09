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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    status: 'draft' | 'published';
    published_at: string | null;
    category: {
        id: number;
        name: string;
    };
    tags: {
        id: number;
        name: string;
        color: string;
    }[];
    created_at: string;
    updated_at: string;
}

interface Props {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
        category: string;
    };
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Index({ posts, filters = { search: '', status: 'all', category: 'all' } }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);
    const [category, setCategory] = useState(filters.category);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/posts',
            { search: value, status, category },
            { preserveState: true }
        );
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        router.get(
            '/posts',
            { search, status: value, category },
            { preserveState: true }
        );
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        router.get(
            '/posts',
            { search, status, category: value },
            { preserveState: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <Link href="/posts/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Post
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg shadow p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Input
                                placeholder="Cari post..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Select value={status} onValueChange={handleStatusChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter berdasarkan status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select value={category} onValueChange={handleCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter berdasarkan kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    {posts.data.map((post) => (
                                        <SelectItem
                                            key={post.category.id}
                                            value={post.category.id.toString()}
                                        >
                                            {post.category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal Publikasi</TableHead>
                                <TableHead>Tanggal Dibuat</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            {post.featured_image && (
                                                <img
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                            <span>{post.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{post.category.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.map((tag) => (
                                                <Badge
                                                    key={tag.id}
                                                    style={{
                                                        backgroundColor: tag.color,
                                                        color: getContrastColor(tag.color),
                                                    }}
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                post.status === 'published'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {post.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {post.published_at
                                            ? format(new Date(post.published_at), 'dd MMMM yyyy', {
                                                  locale: id,
                                              })
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(post.created_at), 'dd MMMM yyyy', {
                                            locale: id,
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/posts/${post.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Link href={`/posts/${post.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Lihat
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            {Array.from({ length: posts.last_page }, (_, i) => i + 1).map(
                                (page) => (
                                    <Link
                                        key={page}
                                        href={`/posts?page=${page}&search=${search}&status=${status}&category=${category}`}
                                        className={`px-3 py-1 rounded ${
                                            page === posts.current_page
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200'
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
