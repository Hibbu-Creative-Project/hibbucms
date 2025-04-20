"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Plus,
  Trash,
  ChevronUp,
  ChevronDown,
  LinkIcon,
  FileText,
  Home,
  ExternalLink,
  GripVertical,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head, useForm, router } from "@inertiajs/react"

interface MenuItem {
  id: string | number;
  title: string;
  url: string;
  type: 'custom' | 'page' | 'post' | 'home';
  target?: '_self' | '_blank';
  order: number;
  parent_id?: number | null;
  children: MenuItem[];
}

interface Menu {
  id: string | number;
  name: string;
  location: string;
  description?: string;
  is_active: boolean;
  items: MenuItem[];
}

interface Page {
  id: string | number;
  title: string;
  slug: string;
}

interface Post {
  id: string | number;
  title: string;
  slug: string;
}

interface Props {
  menus: Menu[];
  pages: Page[];
  posts: Post[];
}

export default function MenuBuilderPage({ menus: initialMenus, pages, posts }: Props) {
  const [activeMenu, setActiveMenu] = useState<string | number>(initialMenus[0]?.id || '')
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenus.find(menu => menu.id === activeMenu)?.items || [])
  const [customLink, setCustomLink] = useState({
    title: '',
    url: ''
  })

  const { data, setData, post, put, processing } = useForm({
    name: initialMenus.find(menu => menu.id === activeMenu)?.name || '',
    location: initialMenus.find(menu => menu.id === activeMenu)?.location || 'header',
    description: initialMenus.find(menu => menu.id === activeMenu)?.description || '',
    is_active: Boolean(initialMenus.find(menu => menu.id === activeMenu)?.is_active)
  })

  useEffect(() => {
    const selectedMenu = initialMenus.find(menu => menu.id.toString() === activeMenu.toString())
    if (selectedMenu) {
      setMenuItems(selectedMenu.items || [])
      setData({
        name: selectedMenu.name,
        location: selectedMenu.location,
        description: selectedMenu.description || '',
        is_active: Boolean(selectedMenu.is_active)
      })
    }
  }, [initialMenus, activeMenu, setData])

  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId)
  }

  const addMenuItem = (type: string, item: Page | Post | { title: string; url: string }) => {
    if (type === 'custom' && (!customLink.title || !customLink.url)) {
      alert('Mohon isi judul dan URL untuk link kustom')
      return
    }

    const url = type === 'custom' ? customLink.url :
               type === 'page' ? `/pages/${(item as Page).slug}` :
               type === 'post' ? `/posts/${(item as Post).slug}` : '/'

    const title = type === 'custom' ? customLink.title : (item as Page | Post).title

    router.post(route('admin.menus.items.store', activeMenu), {
      title,
      url,
      type,
      target: '_self',
      order: menuItems.length
    }, {
      preserveScroll: true
    })

    if (type === 'custom') {
      setCustomLink({ title: '', url: '' })
    }
  }

  const removeMenuItem = (id: string | number) => {
    router.delete(route('admin.menus.items.destroy', id), {
      preserveScroll: true
    })
  }

  const moveItemUp = (index: number) => {
    if (index === 0) return
    const items = [...menuItems]
    const itemsToUpdate = [
      {
        id: items[index].id,
        order: items[index - 1].order,
        parent_id: items[index].parent_id || null
      },
      {
        id: items[index - 1].id,
        order: items[index].order,
        parent_id: items[index - 1].parent_id || null
      }
    ]

    router.post(route('admin.menus.items.reorder', activeMenu), {
      items: itemsToUpdate
    }, {
      preserveScroll: true
    })
  }

  const moveItemDown = (index: number) => {
    if (index === menuItems.length - 1) return
    const items = [...menuItems]
    const itemsToUpdate = [
      {
        id: items[index].id,
        order: items[index + 1].order,
        parent_id: items[index].parent_id || null
      },
      {
        id: items[index + 1].id,
        order: items[index].order,
        parent_id: items[index + 1].parent_id || null
      }
    ]

    router.post(route('admin.menus.items.reorder', activeMenu), {
      items: itemsToUpdate
    }, {
      preserveScroll: true
    })
  }

  const handleCreateMenu = () => {
    post(route('admin.menus.store'))
  }

  const handleUpdateMenu = () => {
    put(route('admin.menus.update', activeMenu))
  }

  const handleUpdateMenuItem = (id: string | number, itemData: { title?: string; url?: string; target?: '_self' | '_blank' }) => {
    const item = menuItems.find(item => item.id === id);
    if (!item) return;

    // Jika hanya mengubah target, kita tetap perlu kirim type
    const updatedData = {
      ...itemData,
      type: item.type
    };

    router.put(route('admin.menus.items.update', id), updatedData, {
      preserveScroll: true
    });
  }

  const breadcrumbs = [
    { title: "Admin", href: "/admin" },
    { title: "Menu Builder", href: "/admin/menus" }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Menu Builder" />
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
            <div>
            <h1 className="text-2xl font-bold">Menu</h1>
            <p className="text-muted-foreground">Buat dan atur navigasi untuk situs Anda</p>
            </div>
          <Button onClick={handleUpdateMenu} disabled={processing}>Simpan Menu</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4 space-y-6">
                <Card>
                <CardHeader>
                <CardTitle>Pengaturan Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                  <Label htmlFor="menu-select">Pilih Menu untuk Diedit</Label>
                  <Select value={activeMenu.toString()} onValueChange={handleMenuChange}>
                        <SelectTrigger>
                      <SelectValue placeholder="Pilih menu" />
                        </SelectTrigger>
                        <SelectContent>
                      {initialMenus.map((menu) => (
                        <SelectItem key={menu.id} value={menu.id.toString()}>
                            {menu.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>

                    <div className="space-y-2">
                  <Label htmlFor="menu-name">Nama Menu</Label>
                    <Input
                        id="menu-name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    />
                    </div>

                    <div className="space-y-2">
                  <Label htmlFor="menu-location">Lokasi Tampilan</Label>
                  <Select value={data.location} onValueChange={(value) => setData('location', value)}>
                        <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent>
                      <SelectItem value="header">Navigasi Header</SelectItem>
                      <SelectItem value="footer">Navigasi Footer</SelectItem>
                      <SelectItem value="sidebar">Navigasi Sidebar</SelectItem>
                      <SelectItem value="mobile">Navigasi Mobile</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                    <div className="pt-2">
                  <Button variant="outline" className="w-full" onClick={handleCreateMenu} disabled={processing}>
                        <Plus className="mr-2 h-4 w-4" />
                    Buat Menu Baru
                    </Button>
                    </div>
                </CardContent>
                </Card>

                <Tabs defaultValue="pages">
                <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pages">Halaman</TabsTrigger>
                <TabsTrigger value="posts">Artikel</TabsTrigger>
                <TabsTrigger value="custom">Link Kustom</TabsTrigger>
                </TabsList>

                <TabsContent value="pages" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="relative">
                    <Input placeholder="Cari halaman..." />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {pages.map((page) => (
                        <div key={page.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="text-sm">{page.title}</div>
                            <Button size="sm" variant="ghost" onClick={() => addMenuItem("page", page)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    </div>
                </TabsContent>

                <TabsContent value="posts" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="relative">
                    <Input placeholder="Cari artikel..." />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {posts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="text-sm">{post.title}</div>
                            <Button size="sm" variant="ghost" onClick={() => addMenuItem("post", post)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    </div>
                </TabsContent>

                <TabsContent value="custom" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="link-text">Teks Link</Label>
                        <Input
                        id="link-text"
                      placeholder="Teks Menu Item"
                      value={customLink.title}
                      onChange={(e) => setCustomLink(prev => ({ ...prev, title: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link-url">URL</Label>
                        <Input
                        id="link-url"
                        placeholder="https://example.com"
                      value={customLink.url}
                      onChange={(e) => setCustomLink(prev => ({ ...prev, url: e.target.value }))}
                        />
                    </div>
                  <Button
                    onClick={() => addMenuItem("custom", customLink)}
                    disabled={!customLink.title || !customLink.url}
                  >
                        <Plus className="mr-2 h-4 w-4" />
                    Tambah ke Menu
                    </Button>
                    </div>
                </TabsContent>
                </Tabs>
            </div>

            <div className="md:col-span-8">
                <Card>
                <CardHeader>
                <CardTitle>Struktur Menu</CardTitle>
                </CardHeader>
                <CardContent>
                {!activeMenu ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Silakan pilih menu dari dropdown di panel kiri.
                  </div>
                ) : menuItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                    Menu Anda kosong. Tambahkan item dari panel kiri.
                    </div>
                    ) : (
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="text-muted-foreground cursor-move">
                            <GripVertical className="h-5 w-5" />
                            </div>
                            <Accordion type="single" collapsible className="flex-1">
                          <AccordionItem value={item.id.toString()} className="border-none">
                                <div className="flex items-center">
                                {item.type === "page" && <FileText className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "post" && <FileText className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "custom" && <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "home" && <Home className="h-4 w-4 mr-2 text-muted-foreground" />}
                              <span className="font-medium">{item.title}</span>
                                <AccordionTrigger className="ml-auto" />
                                </div>
                                <AccordionContent>
                                <div className="space-y-3 pt-2">
                                    <div className="space-y-1">
                                  <Label htmlFor={`item-${item.id}-label`}>Label Navigasi</Label>
                                    <Input
                                        id={`item-${item.id}-label`}
                                    defaultValue={item.title}
                                    onChange={(e) => handleUpdateMenuItem(item.id, { title: e.target.value })}
                                    />
                                    </div>
                                    <div className="space-y-1">
                                    <Label htmlFor={`item-${item.id}-url`}>URL</Label>
                                    <Input
                                        id={`item-${item.id}-url`}
                                        defaultValue={item.url}
                                    onChange={(e) => handleUpdateMenuItem(item.id, { url: e.target.value })}
                                    />
                                    </div>
                                    <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateMenuItem(item.id, { target: item.target === '_blank' ? '_self' : '_blank' })}
                                  >
                                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                    {item.target === '_blank' ? 'Buka di tab yang sama' : 'Buka di tab baru'}
                                    </Button>
                                    </div>
                                </div>
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                            <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => moveItemUp(index)} disabled={index === 0}>
                                <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveItemDown(index)}
                                disabled={index === menuItems.length - 1}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeMenuItem(item.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
    </AppLayout>
  )
}
