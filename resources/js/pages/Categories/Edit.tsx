import Form from './Form';

interface Props {
    category: {
        id: number;
        name: string;
        description: string;
    };
}

export default function Edit({ category }: Props) {
    return <Form category={category} />;
}
