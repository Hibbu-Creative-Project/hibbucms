import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderTree, Tag, Image, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
    posts: {
        total: number;
        published: number;
        draft: number;
        trend: number;
    };
    categories: {
        total: number;
        trend: number;
    };
    tags: {
        total: number;
        trend: number;
    };
    media: {
        total: number;
        trend: number;
    };
}

interface RecentPost {
    id: number;
    title: string;
    status: 'published' | 'draft';
    created_at: string;
    author: {
        name: string;
    };
}

interface RecentMedia {
    id: number;
    name: string;
    url: string;
    mime_type: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentPosts: RecentPost[];
    recentMedia: RecentMedia[];
}

export default function Dashboard({
    stats = {
        posts: { total: 0, published: 0, draft: 0, trend: 0 },
        categories: { total: 0, trend: 0 },
        tags: { total: 0, trend: 0 },
        media: { total: 0, trend: 0 }
    },
    recentPosts = [],
    recentMedia = []
}: Props) {
    const hasNoContent = stats.posts.total === 0 &&
                        stats.categories.total === 0 &&
                        stats.tags.total === 0 &&
                        stats.media.total === 0;

    if (hasNoContent) {
        return (
            <AppLayout>
                <Head title="Dashboard" />

                <div className="p-4">
                    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg">
                        <FileText className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-1">Selamat Datang di HibbuCMS</h3>
                        <p className="text-center mb-8 max-w-md">
                            Mulai dengan membuat konten pertama Anda. Anda dapat membuat post, kategori, tag, atau mengunggah media.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/posts/create">
                                <Button className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Buat Post
                                </Button>
                            </Link>
                            <Link href="/categories/create">
                                <Button className="w-full">
                                    <FolderTree className="mr-2 h-4 w-4" />
                                    Buat Kategori
                                </Button>
                            </Link>
                            <Link href="/tags/create">
                                <Button className="w-full">
                                    <Tag className="mr-2 h-4 w-4" />
                                    Buat Tag
                                </Button>
                            </Link>
                            <Link href="/media">
                                <Button className="w-full">
                                    <Image className="mr-2 h-4 w-4" />
                                    Upload Media
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="p-4 space-y-4">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.posts.total}</div>
                            <div className="text-xs text-muted-foreground">
                                {stats.posts.published} Published, {stats.posts.draft} Draft
                            </div>
                            <div className="mt-1 flex items-center text-xs">
                                {stats.posts.trend > 0 ? (
                                    <ArrowUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={stats.posts.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Math.abs(stats.posts.trend)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <FolderTree className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.categories.total}</div>
                            <div className="mt-1 flex items-center text-xs">
                                {stats.categories.trend > 0 ? (
                                    <ArrowUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={stats.categories.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Math.abs(stats.categories.trend)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Tags</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.tags.total}</div>
                            <div className="mt-1 flex items-center text-xs">
                                {stats.tags.trend > 0 ? (
                                    <ArrowUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={stats.tags.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Math.abs(stats.tags.trend)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Media</CardTitle>
                            <Image className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.media.total}</div>
                            <div className="mt-1 flex items-center text-xs">
                                {stats.media.trend > 0 ? (
                                    <ArrowUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={stats.media.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Math.abs(stats.media.trend)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Content Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPosts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400 text-center mb-4">Belum ada post</p>
                                    <Link href="/posts/create">
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Buat Post
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                            <div className="space-y-4">
                                {recentPosts.map(post => (
                                    <div key={post.id} className="flex items-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{post.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                by {post.author.name} • {new Date(post.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="ml-auto">
                                            <span className={`text-xs ${
                                                post.status === 'published' ? 'text-green-500' : 'text-yellow-500'
                                            }`}>
                                                {post.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Media */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentMedia.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400 text-center mb-4">Belum ada media</p>
                                    <Link href="/media">
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Upload Media
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {recentMedia.map(media => (
                                    <div key={media.id} className="relative aspect-square group">
                                        {media.mime_type?.startsWith('image/') ? (
                                            <img
                                                src={media.url}
                                                alt={media.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                <FileText className="h-6 w-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <p className="text-white text-xs text-center px-2 truncate">
                                                {media.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
