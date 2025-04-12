import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ThemeCard } from '@/components/theme-card';
import { FileText, Plus, Upload, Palette } from 'lucide-react';
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

            <div className="p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Palette className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight">Themes</h1>
                    </div>
                    <p className="text-muted-foreground">Kelola dan sesuaikan tampilan situs Anda dengan tema yang menarik.</p>
                </div>

                {/* Actions Section */}
                <div className="flex justify-end gap-3 mb-6">
                    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="shadow-sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Theme
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5" />
                                    Upload Theme
                                </DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground pt-2">
                                    Upload tema dalam format ZIP. File ZIP harus berisi file theme.json dan semua file tema yang diperlukan.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="theme" className="text-sm font-medium">Theme File (ZIP)</Label>
                                    <Input
                                        id="theme"
                                        type="file"
                                        accept=".zip"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                    Batal
                                </Button>
                                <Button onClick={handleUpload} disabled={!selectedFile} className="min-w-[100px]">
                                    {selectedFile ? 'Upload' : 'Pilih File'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={handleScan} variant="default" className="shadow-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Scan Themes
                    </Button>
                </div>

                {/* Content Section */}
                <div className="rounded-xl border bg-card shadow-sm">
                    {themes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <div className="rounded-full bg-muted p-4 mb-4">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada tema</h3>
                            <p className="text-muted-foreground text-center max-w-md mb-6">
                                Tambahkan tema baru dengan mengunggah file ZIP atau letakkan langsung di direktori tema
                            </p>
                            <div className="flex gap-3">
                                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="shadow-sm">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Theme
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <Upload className="h-5 w-5" />
                                                Upload Theme
                                            </DialogTitle>
                                            <DialogDescription className="text-sm text-muted-foreground pt-2">
                                                Upload tema dalam format ZIP. File ZIP harus berisi file theme.json dan semua file tema yang diperlukan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="theme-empty" className="text-sm font-medium">Theme File (ZIP)</Label>
                                                <Input
                                                    id="theme-empty"
                                                    type="file"
                                                    accept=".zip"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter className="gap-2">
                                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                                Batal
                                            </Button>
                                            <Button onClick={handleUpload} disabled={!selectedFile} className="min-w-[100px]">
                                                {selectedFile ? 'Upload' : 'Pilih File'}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button onClick={handleScan} variant="outline" className="shadow-sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Scan Themes
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
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
