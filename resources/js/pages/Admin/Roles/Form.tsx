import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { toast } from 'sonner';

interface Permission {
    id: number;
    name: string;
    group: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    role?: Role;
    permissions: Permission[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Create',
        href: '/roles/create',
    },
];

export default function Form({ role, permissions }: Props) {
    const [values, setValues] = useState({
        name: role?.name || '',
        permissions: role?.permissions.map(p => p.id) || [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Group permissions by their group name
    const groupedPermissions = permissions.reduce((groups: { [key: string]: Permission[] }, permission) => {
        const group = permission.group || 'Other';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(permission);
        return groups;
    }, {});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = {
            name: values.name,
            permissions: values.permissions,
        };

        if (role) {
            router.put(`/roles/${role.id}`, submitData, {
                onSuccess: () => {
                    toast.success('Peran berhasil diperbarui');
                    setIsSubmitting(false);
                },
                onError: () => {
                    toast.error('Gagal memperbarui peran');
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/roles', submitData, {
                onSuccess: () => {
                    toast.success('Peran berhasil dibuat');
                    setIsSubmitting(false);
                },
                onError: () => {
                    toast.error('Gagal membuat peran');
                    setIsSubmitting(false);
                },
            });
        }
    };

    const togglePermission = (permissionId: number) => {
        setValues(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter(id => id !== permissionId)
                : [...prev.permissions, permissionId],
        }));
    };

    const togglePermissionGroup = (groupPermissions: Permission[]) => {
        const permissionIds = groupPermissions.map(p => p.id);
        const allSelected = groupPermissions.every(p => values.permissions.includes(p.id));

        setValues(prev => ({
            ...prev,
            permissions: allSelected
                ? prev.permissions.filter(id => !permissionIds.includes(id))
                : [...new Set([...prev.permissions, ...permissionIds])],
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role ? 'Edit Role' : 'Create Role'} />

            <div className="p-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link href="/roles" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke daftar peran
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-200">{role ? 'Edit Peran' : 'Buat Peran Baru'}</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-[#0c1015] p-6">
                        <div className="mb-6">
                            <Label htmlFor="name" className="text-gray-200">Nama Peran</Label>
                            <Input
                                id="name"
                                type="text"
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                className="mt-2 bg-gray-900 border-gray-800 text-gray-200"
                                placeholder="Masukkan nama peran"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-200 mb-4 block">Izin</Label>
                            <div className="space-y-6">
                                {Object.entries(groupedPermissions).map(([group, groupPermissions]) => (
                                    <div key={group} className="rounded border border-gray-800 overflow-hidden">
                                        <div className="bg-gray-900 p-4 flex items-center">
                                            <Checkbox
                                                checked={groupPermissions.every(p => values.permissions.includes(p.id))}
                                                onCheckedChange={() => togglePermissionGroup(groupPermissions)}
                                                className="border-gray-700"
                                            />
                                            <span className="ml-3 text-gray-200 font-medium">{group}</span>
                                        </div>
                                        <div className="p-4 bg-[#0c1015] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {groupPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center">
                                                    <Checkbox
                                                        checked={values.permissions.includes(permission.id)}
                                                        onCheckedChange={() => togglePermission(permission.id)}
                                                        className="border-gray-700"
                                                    />
                                                    <span className="ml-3 text-gray-300">{permission.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white hover:bg-gray-100 text-black"
                        >
                            {isSubmitting ? 'Menyimpan...' : role ? 'Update Peran' : 'Buat Peran'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
