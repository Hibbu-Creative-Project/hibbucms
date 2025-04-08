import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

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
    post: Post;
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
    {
        title: 'Show',
        href: '/posts/{id}',
    },
];

export default function Show({ post }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Post: ${post.title}`} />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <div className="flex space-x-2">
                        <Link href={`/posts/${post.id}/edit`}>
                            <Button variant="outline">Edit</Button>
                        </Link>
                        <Link href="/posts">
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                <h3 className="font-medium">Title</h3>
                                <p>{post.title}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Slug</h3>
                                <p>{post.slug}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Excerpt</h3>
                                <p>{post.excerpt}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Category</h3>
                                <p>{post.category.name}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Tags</h3>
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
                            </div>
                            <div>
                                <h3 className="font-medium">Status</h3>
                                <Badge
                                    variant={
                                        post.status === 'published'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {post.status}
                                </Badge>
                            </div>
                            <div>
                                <h3 className="font-medium">Published At</h3>
                                <p>
                                    {post.published_at
                                        ? format(
                                              new Date(post.published_at),
                                              'dd MMMM yyyy HH:mm',
                                              {
                                                  locale: id,
                                              },
                                          )
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium">Created At</h3>
                                <p>
                                    {format(new Date(post.created_at), 'dd MMMM yyyy HH:mm', {
                                        locale: id,
                                    })}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium">Updated At</h3>
                                <p>
                                    {format(new Date(post.updated_at), 'dd MMMM yyyy HH:mm', {
                                        locale: id,
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {post.featured_image && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-auto rounded-lg"
                                />
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </CardContent>
                    </Card>
                </div>
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
