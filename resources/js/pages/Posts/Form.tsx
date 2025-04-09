import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import RichTextEditor from '@/components/RichTextEditor';
import MediaPicker from '@/components/MediaPicker';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
        featured_image_id?: string;
    };
    categories: Category[];
    tags: Tag[];
    media: { id: number; name: string; url?: string }[];
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        featured_image: null as File | null,
        status: post?.status || 'draft',
        category_id: post?.category_id?.toString() || '',
        tag_ids: post?.tag_ids?.map(id => id.toString()) || [],
    });

    const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(
        post?.featured_image_id?.toString() || undefined
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('excerpt', values.excerpt);
        formData.append('content', values.content);
        formData.append('status', values.status);
        formData.append('category_id', values.category_id);
        values.tag_ids.forEach((tagId) => {
            formData.append('tags[]', tagId);
        });

        // Handle featured image
        if (values.featured_image) {
            formData.append('featured_image', values.featured_image);
        } else if (selectedMediaId) {
            formData.append('featured_image_id', selectedMediaId);
        }

        if (post) {
            formData.append('_method', 'PUT');
            router.post(`/posts/${post.id}`, formData, {
                onSuccess: () => {
                    toast.success('Post berhasil diperbarui');
                    setIsSubmitting(false);
                },
                onError: () => {
                    toast.error('Gagal memperbarui post');
                    setIsSubmitting(false);
                }
            });
        } else {
            router.post('/posts', formData, {
                onSuccess: () => {
                    toast.success('Post berhasil dibuat');
                    setIsSubmitting(false);
                },
                onError: () => {
                    toast.error('Gagal membuat post');
                    setIsSubmitting(false);
                }
            });
        }
    };

    const handleTagChange = (selectedTags: string[]) => {
        setValues({ ...values, tag_ids: selectedTags });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post ? 'Edit Post' : 'Create Post'} />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-200">{post ? 'Edit Post' : 'Buat Post Baru'}</h1>
                </div>

                <div className="flex gap-4">
                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                        <div className="rounded-lg p-4 border space-y-4">
                            <div>
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
                                    placeholder="Masukkan judul post"
                                    required
                                    className="text-xl font-semibold text-gray-200 placeholder:text-gray-500 border-0 p-0 focus-visible:ring-0"
                                />
                            </div>

                            <div>
                                <RichTextEditor
                                    content={values.content}
                                    onChange={(content) =>
                                        setValues({
                                            ...values,
                                            content,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="excerpt" className="text-gray-200 mb-2 block">Ringkasan</Label>
                                <Textarea
                                    id="excerpt"
                                    value={values.excerpt}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            excerpt: e.target.value,
                                        })
                                    }
                                    placeholder="Masukkan ringkasan post"
                                    className="min-h-[100px] text-gray-200 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 space-y-4">
                        <div className="rounded-lg p-4 border space-y-4">
                            <div className="flex justify-between items-center">
                                <Button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit(e as unknown as FormEvent);
                                    }}
                                    disabled={isSubmitting}
                                    className="bg-white hover:bg-gray-200 text-black"
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {post ? 'Update Post' : 'Buat Post'}
                                </Button>

                                <Select
                                    value={values.status}
                                    onValueChange={(value: 'draft' | 'published') =>
                                        setValues({
                                            ...values,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-32 text-gray-200">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft" className="text-gray-200 hover:bg-gray-800">Draft</SelectItem>
                                        <SelectItem value="published" className="text-gray-200 hover:bg-gray-800">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="rounded-lg p-4 border space-y-4">
                            <h3 className="font-semibold text-gray-200">Kategori</h3>
                            <Select
                                value={values.category_id}
                                onValueChange={(value) =>
                                    setValues({
                                        ...values,
                                        category_id: value,
                                    })
                                }
                            >
                                <SelectTrigger className="text-gray-200">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                            className="text-gray-200 hover:bg-gray-800"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-lg p-4 border space-y-4">
                            <h3 className="font-semibold text-gray-200">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <label
                                        key={tag.id}
                                        className="flex items-center space-x-2 p-2 border rounded cursor-pointer transition-colors"
                                        style={{
                                            backgroundColor: values.tag_ids.includes(tag.id.toString())
                                                ? tag.color
                                                : 'transparent',
                                            color: values.tag_ids.includes(tag.id.toString())
                                                ? getContrastColor(tag.color)
                                                : '#e5e7eb',
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

                        <div className="rounded-lg p-4 border space-y-4">
                            <h3 className="font-semibold text-gray-200">Featured Image</h3>
                            <MediaPicker
                                media={media}
                                selectedMediaId={selectedMediaId}
                                onSelect={(mediaId) => {
                                    setSelectedMediaId(mediaId);
                                    setValues({ ...values, featured_image: null });
                                }}
                                onUpload={(file) => {
                                    setValues({ ...values, featured_image: file });
                                    setSelectedMediaId(undefined);
                                }}
                                featuredImageUrl={post?.featured_image_url}
                            />
                        </div>
                    </div>
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
