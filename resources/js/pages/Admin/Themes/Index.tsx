import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ThemeCard } from '@/components/theme-card';
import { FileText, Plus } from 'lucide-react';

interface Theme {
    id: number;
    name: string;
    description: string | null;
    version: string;
    author: string | null;
    is_active: boolean;
    screenshot_url: string | null;
}

interface Props {
    themes: Theme[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Themes',
        href: '/themes',
    },
];

export default function Index({ themes }: Props) {
    const handleScan = () => {
        router.post('/themes/scan');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Themes" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Themes</h1>
                    <Button onClick={handleScan}>
                        <Plus className="mr-2 h-4 w-4" />
                        Scan for Themes
                    </Button>
                </div>

                <div className="rounded-lg shadow">
                    {themes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border border-gray-800 rounded-lg">
                            <FileText className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-200 mb-1">No themes found</h3>
                            <p className="text-gray-400 text-center mb-4">
                                Add new themes by placing them in the themes directory
                            </p>
                            <Button onClick={handleScan} className="bg-white hover:bg-gray-100 text-black">
                                <Plus className="mr-2 h-4 w-4" />
                                Scan for Themes
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                            {themes.map((theme) => (
                                <ThemeCard key={theme.id} theme={theme} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
