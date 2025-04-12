import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Page } from '@/types';

interface Props {
  page: Page;
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
  {
    title: 'Detail',
    href: '/admin/pages/show',
  },
];

export default function Show({ page }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={page.title} />

      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{page.title}</h1>
          <div className="flex gap-2">
            <Link href={route('pages.edit', page.id)}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Link href={route('pages.index')}>
              <Button variant="outline">Kembali</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Konten</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                    {page.status === 'published' ? 'Dipublikasi' : 'Draft'}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Penulis</div>
                  <div>{page.user.name}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Urutan</div>
                  <div>{page.order}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Tanggal Dibuat</div>
                  <div>
                    {format(new Date(page.created_at), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Terakhir Diperbarui</div>
                  <div>
                    {format(new Date(page.updated_at), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Meta Description</div>
                  <div>{page.meta_description || '-'}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Meta Keywords</div>
                  <div>{page.meta_keywords || '-'}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
