import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ImageIcon, Calendar, User, Clock, ArrowLeft, Edit2 } from 'lucide-react';

interface Props {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image_url?: string;
        status: 'draft' | 'published';
        published_at: string | null;
        created_at: string;
        updated_at: string;
        category: {
            id: number;
            name: string;
        };
        tags: {
            id: number;
            name: string;
            color: string;
        }[];
        user: {
            id: number;
            name: string;
            avatar_url?: string;
        };
    };
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Posts',
        href: '/admin/posts',
    },
    {
        title: 'Detail Post',
        href: '#',
    },
];

function getContrastColor(hexColor: string): string {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

export default function Show({ post }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Post: ${post.title}`} />

            <div className="p-4 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <Link href="/admin/posts" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke daftar post
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-200 mb-4">{post.title}</h1>

                        <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {post.user.name}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {post.published_at
                                    ? format(new Date(post.published_at), 'dd MMMM yyyy', { locale: id })
                                    : 'Belum dipublikasi'}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Diperbarui {format(new Date(post.updated_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}
                                className={post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}>
                                {post.status === 'published' ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline" className="border-gray-700">
                                {post.category.name}
                            </Badge>
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
                    </div>

                    <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="outline" className="border-gray-700 text-gray-200 hover:bg-gray-800">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Post
                        </Button>
                    </Link>
                </div>

                {/* Featured Image */}
                {post.featured_image_url ? (
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                        <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-800');
                                    const icon = document.createElement('div');
                                    icon.className = 'text-gray-400';
                                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                                    parent.appendChild(icon);
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-[400px] rounded-lg bg-gray-800 flex items-center justify-center mb-8">
                        <ImageIcon className="w-12 h-12 text-gray-600" />
                    </div>
                )}

                {/* Content */}
                <div className="space-y-6">
                    {post.excerpt && (
                        <div className="text-lg text-gray-400 border-l-4 border-gray-700 pl-4">
                            {post.excerpt}
                        </div>
                    )}

                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </AppLayout>
    );
}
