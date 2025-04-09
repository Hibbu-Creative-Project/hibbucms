import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ThemeCard } from '@/components/theme-card';
import { FileText, Plus, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useRef } from 'react';

interface Theme {
    id: number;
    name: string;
    description: string | null;
    version: string;
    author: string | null;
    is_active: boolean;
    preview: string | null;
    preview_url: string | null;
    has_preview: boolean;
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
        href: '/admin/themes',
    },
];

export default function Index({ themes }: Props) {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleScan = () => {
        router.post('/admin/themes/scan');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('theme', selectedFile);
            router.post('/admin/themes/upload', formData);
            setIsUploadDialogOpen(false);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Themes" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Themes</h1>
                    <div className="flex gap-2">
                        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Theme
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Upload Theme</DialogTitle>
                                    <DialogDescription>
                                        Upload a theme in ZIP format. The ZIP file should contain a theme.json file and all necessary theme files.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="theme">Theme File (ZIP)</Label>
                                        <Input
                                            id="theme"
                                            type="file"
                                            accept=".zip"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpload} disabled={!selectedFile}>
                                        Upload Theme
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button onClick={handleScan}>
                            <Plus className="mr-2 h-4 w-4" />
                            Scan for Themes
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg shadow">
                    {themes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border border-gray-800 rounded-lg">
                            <FileText className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-200 mb-1">No themes found</h3>
                            <p className="text-gray-400 text-center mb-4">
                                Add new themes by uploading a ZIP file or placing them in the themes directory
                            </p>
                            <div className="flex gap-2">
                                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-white hover:bg-gray-100 text-black">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Theme
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Upload Theme</DialogTitle>
                                            <DialogDescription>
                                                Upload a theme in ZIP format. The ZIP file should contain a theme.json file and all necessary theme files.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="theme-empty">Theme File (ZIP)</Label>
                                                <Input
                                                    id="theme-empty"
                                                    type="file"
                                                    accept=".zip"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleUpload} disabled={!selectedFile}>
                                                Upload Theme
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button onClick={handleScan} variant="outline">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Scan for Themes
                                </Button>
                            </div>
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
