import { Page } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Pagination } from '@/components/ui/pagination';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';

interface Props {
  pages: {
    data: Page[];
    current_page: number;
    last_page: number;
  };
  filters: {
    search: string;
    status: string;
  };
}

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Pages',
    href: '/admin/pages',
  },
];

export default function Index({ pages, filters }: Props) {
  const { data, setData, get, delete: destroy } = useForm({
    search: filters.search,
    status: filters.status,
  });

  const handleSearch = (value: string) => {
    setData('search', value);
    get(route('pages.index'), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleStatusChange = (value: string) => {
    setData('status', value);
    get(route('pages.index'), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
      destroy(route('pages.destroy', id), {
        onSuccess: () => {
          toast.success('Halaman berhasil dihapus');
        },
      });
    }
  };

  const handlePublish = (id: number, currentStatus: string) => {
    const routeName = currentStatus === 'draft' ? 'pages.publish' : 'pages.unpublish';
    router.post(route(routeName, id), {}, {
      onSuccess: () => {
        toast.success(
          `Halaman berhasil ${
            currentStatus === 'draft' ? 'dipublikasikan' : 'dijadikan draft'
          }`
        );
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pages" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Pages</h1>
            <Link href={route('pages.create')}>
                <Button>
                    Tambah Halaman
                </Button>
            </Link>
        </div>

        <div className="rounded-lg shadow border p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Cari halaman..."
                value={data.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select
                value={data.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Dipublikasi</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow border">
          {pages.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <h3 className="text-lg font-medium mb-1">Belum ada halaman</h3>
              <p className="text-center mb-4">
                {data.search || data.status !== 'all'
                  ? 'Tidak ada halaman yang sesuai dengan filter Anda'
                  : 'Mulai dengan membuat halaman baru'}
              </p>
              <Link href={route('pages.create')}>
                <Button>Tambah Halaman Baru</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.data.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={page.status === 'published' ? 'default' : 'secondary'}
                      >
                        {page.status === 'published' ? 'Dipublikasi' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{page.user.name}</TableCell>
                    <TableCell>
                      {format(new Date(page.created_at), 'dd MMM yyyy', {
                        locale: id,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={route('pages.show', page.id)}>
                          <Button variant="ghost" size="sm">
                            Lihat
                          </Button>
                        </Link>
                        <Link href={route('pages.edit', page.id)}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublish(page.id, page.status)}
                        >
                          {page.status === 'draft' ? 'Publikasi' : 'Draft'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {pages.last_page > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={pages.current_page}
              lastPage={pages.last_page}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
