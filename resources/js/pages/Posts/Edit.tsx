import Form from './Form';

interface Props {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
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
}

export default function Edit({ post, categories, tags }: Props) {
    return <Form post={post} categories={categories} tags={tags} />;
}
