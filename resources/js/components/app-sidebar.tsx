import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, FileText, Tag, FolderTree, Settings, Users, Shield, Image, Paintbrush, File } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

const contentNavItems: NavItem[] = [
    {
        title: 'Pages',
        href: '/admin/pages',
        icon: File,
    },
    {
        title: 'Posts',
        href: '/admin/posts',
        icon: FileText,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: FolderTree,
    },
    {
        title: 'Tags',
        href: '/admin/tags',
        icon: Tag,
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: Image,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/admin/roles',
        icon: Shield,
    },
    {
        title: 'Themes',
        href: '/admin/themes',
        icon: Paintbrush,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <div className="px-4 text-xs font-semibold text-muted-foreground">Platform</div>
                <NavMain items={mainNavItems} />

                <div className="mt-2 px-4 text-xs font-semibold text-muted-foreground">Content Management</div>
                <NavMain items={contentNavItems} />

                <div className="mt-2 px-4 text-xs font-semibold text-muted-foreground">Administration</div>
                <NavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
