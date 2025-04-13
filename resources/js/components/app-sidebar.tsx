import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, File, FileText, Settings, Users, Shield, Image, Paintbrush } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

const contentNavItems = [
    {
        title: 'Pages',
        href: '/admin/pages',
        icon: File,
    },
    {
        title: 'Posts',
        href: '/admin/posts',
        icon: FileText,
        items: [
            {
                title: 'All Posts',
                href: '/admin/posts',
            },
            {
                title: 'Categories',
                href: '/admin/categories',
            },
            {
                title: 'Tags',
                href: '/admin/tags',
            },
        ],
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: Image,
    },
] as NavItem[];

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
                <NavMain items={mainNavItems} label="Platform" />
                <NavMain items={contentNavItems} label="Content Management" />
                <NavMain items={adminNavItems} label="Administration" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
