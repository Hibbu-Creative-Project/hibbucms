import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Fragment, type ReactElement } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    posts_count: number;
    children?: Category[];
}

interface Props {
    categories: Category[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Index({ categories }: Props) {
    const renderCategories = (categories: Category[]): ReactElement[] => {
        return categories.map((category) => (
            <Fragment key={category.id}>
                <TableRow>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                        {format(new Date(category.created_at), 'dd MMMM yyyy', {
                            locale: id,
                        })}
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                            <Link href={`/categories/${category.id}/edit`}>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            </Link>
                            <Link href={`/categories/${category.id}`}>
                                <Button variant="outline" size="sm">
                                    View
                                </Button>
                            </Link>
                        </div>
                    </TableCell>
                </TableRow>
                {category.children && renderCategories(category.children)}
            </Fragment>
        ));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Link href="/categories/create">
                        <Button>Create Category</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderCategories(categories)}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
