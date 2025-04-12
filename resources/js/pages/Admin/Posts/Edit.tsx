import Form from './Form';

interface Props {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        featured_image_url?: string;
        status: 'draft' | 'published';
        category_id: number;
        tag_ids: number[];
    };
    categories: {
        id: number;
        name: string;
    }[];
    tags: {
        id: number;
        name: string;
        color: string;
    }[];
    media: {
        id: number;
        name: string;
        url?: string;
    }[];
}

export default function Edit({ post, categories, tags, media }: Props) {
    return <Form post={post} categories={categories} tags={tags} media={media} />;
}
