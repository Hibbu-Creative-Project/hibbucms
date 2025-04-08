import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    category?: {
        id: number;
        name: string;
        description: string;
    };
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
    {
        title: 'Create',
        href: '/categories/create',
    },
];

export default function Form({ category }: Props) {
    const [values, setValues] = useState({
        name: category?.name || '',
        description: category?.description || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (category) {
            router.put(`/categories/${category.id}`, values);
        } else {
            router.post('/categories', values);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category ? 'Edit Category' : 'Create Category'} />

            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {category ? 'Edit Category' : 'Create Category'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={values.name}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={values.description}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit">
                            {category ? 'Update' : 'Create'} Category
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}