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

interface Media {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    tags: Tag[];
    media: Media[];
}

export default function Create({ categories, tags, media }: Props) {
    return <Form categories={categories} tags={tags} media={media} />;
}
