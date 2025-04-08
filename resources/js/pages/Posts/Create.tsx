import Form from './Form';

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
    categories: Category[];
    tags: Tag[];
}

export default function Create({ categories, tags }: Props) {
    return <Form categories={categories} tags={tags} />;
}
