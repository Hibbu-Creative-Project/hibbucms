import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import RichTextEditor from '@/components/RichTextEditor';

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface Props {
    post?: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        status: 'draft' | 'published';
        category_id: number;
        tag_ids: number[];
        featured_image_url?: string;
    };
    categories: Category[];
    tags: Tag[];
    media: { id: number; name: string }[];
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
        title: 'Create',
        href: '/posts/create',
    },
];

export default function Form({ post, categories, tags, media }: Props) {
    const [values, setValues] = useState({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        featured_image: null as File | null,
        status: post?.status || 'draft',
        category_id: post?.category_id?.toString() || '',
        tag_ids: post?.tag_ids?.map(id => id.toString()) || [],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(post?.featured_image_url || null);
    const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(post?.featured_image?.toString() || undefined);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('excerpt', values.excerpt);
        formData.append('content', values.content);
        formData.append('status', values.status);
        formData.append('category_id', values.category_id);
        values.tag_ids.forEach((tagId) => {
            formData.append('tags[]', tagId);
        });

        if (selectedMediaId) {
            formData.append('featured_image_id', selectedMediaId);
        }

        if (post) {
            formData.append('_method', 'PUT');
            router.post(`/posts/${post.id}`, formData);
        } else {
            router.post('/posts', formData);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValues({ ...values, featured_image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagChange = (selectedTags: string[]) => {
        setValues({ ...values, tag_ids: selectedTags });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post ? 'Edit Post' : 'Create Post'} />

            <div className="p-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={values.title}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={values.excerpt}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                excerpt: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={values.category_id}
                                        onValueChange={(value) =>
                                            setValues({
                                                ...values,
                                                category_id: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="tags">Tags</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {tags.map((tag) => (
                                            <label
                                                key={tag.id}
                                                className="flex items-center space-x-2 p-2 border rounded"
                                                style={{
                                                    backgroundColor: values.tag_ids.includes(tag.id.toString())
                                                        ? tag.color
                                                        : 'transparent',
                                                    color: values.tag_ids.includes(tag.id.toString())
                                                        ? getContrastColor(tag.color)
                                                        : 'inherit',
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={tag.id}
                                                    checked={values.tag_ids.includes(tag.id.toString())}
                                                    onChange={(e) => {
                                                        const tagId = e.target.value;
                                                        if (e.target.checked) {
                                                            handleTagChange([...values.tag_ids, tagId]);
                                                        } else {
                                                            handleTagChange(
                                                                values.tag_ids.filter((id) => id !== tagId)
                                                            );
                                                        }
                                                    }}
                                                    className="mr-2"
                                                />
                                                {tag.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={values.status}
                                        onValueChange={(value) =>
                                            setValues({
                                                ...values,
                                                status: value as 'draft' | 'published',
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="featured_image">Featured Image</Label>
                                    <Select
                                        value={selectedMediaId}
                                        onValueChange={(value) => setSelectedMediaId(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select featured image" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {media.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RichTextEditor
                                    content={values.content}
                                    onChange={(content) =>
                                        setValues({ ...values, content })
                                    }
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit">
                            {post ? 'Update' : 'Create'} Post
                        </Button>
                    </div>
                </form>
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
