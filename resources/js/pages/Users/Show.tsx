import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    bio: string | null;
    avatar: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    instagram_url: string | null;
    linkedin_url: string | null;
}

interface Props {
    user: User;
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'View',
        href: '/users/view',
    },
];

export default function Show({ user }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Link href={`/users/${user.id}/edit`}>
                        <Button>Edit User</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                {user.avatar ? (
                                    <img
                                        src={`/storage/${user.avatar}`}
                                        alt={user.name}
                                        className="h-24 w-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {user.name}
                                    </h2>
                                    <p className="text-gray-600">{user.email}</p>
                                    <div className="mt-2 flex gap-1">
                                        {user.roles.map((role) => (
                                            <span
                                                key={role.id}
                                                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {user.bio && (
                                    <div>
                                        <h3 className="mb-2 font-semibold">Bio</h3>
                                        <p className="text-gray-600">{user.bio}</p>
                                    </div>
                                )}

                                <div>
                                    <h3 className="mb-2 font-semibold">
                                        Social Media
                                    </h3>
                                    <div className="flex gap-2">
                                        {user.facebook_url && (
                                            <a
                                                href={user.facebook_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <Facebook className="h-5 w-5" />
                                            </a>
                                        )}
                                        {user.twitter_url && (
                                            <a
                                                href={user.twitter_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <Twitter className="h-5 w-5" />
                                            </a>
                                        )}
                                        {user.instagram_url && (
                                            <a
                                                href={user.instagram_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <Instagram className="h-5 w-5" />
                                            </a>
                                        )}
                                        {user.linkedin_url && (
                                            <a
                                                href={user.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
