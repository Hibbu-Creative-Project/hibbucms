<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Create Header Menu
        $headerMenu = Menu::create([
            'name' => 'Menu Utama',
            'location' => 'header',
            'description' => 'Menu navigasi utama website',
            'is_active' => true,
        ]);

        // Create Header Menu Items
        $homeItem = MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Beranda',
            'url' => '/',
            'type' => 'home',
            'target' => '_self',
            'order' => 0,
        ]);

        $aboutItem = MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Tentang Kami',
            'url' => '/pages/about',
            'type' => 'page',
            'target' => '_self',
            'order' => 1,
        ]);

        $servicesItem = MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Layanan',
            'url' => '#',
            'type' => 'custom',
            'target' => '_self',
            'order' => 2,
        ]);

        // Create submenu items under Services
        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'parent_id' => $servicesItem->id,
            'title' => 'Konsultasi',
            'url' => '/pages/consultation',
            'type' => 'page',
            'target' => '_self',
            'order' => 0,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'parent_id' => $servicesItem->id,
            'title' => 'Pengembangan',
            'url' => '/pages/development',
            'type' => 'page',
            'target' => '_self',
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Blog',
            'url' => '/posts',
            'type' => 'custom',
            'target' => '_self',
            'order' => 3,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Kontak',
            'url' => '/pages/contact',
            'type' => 'page',
            'target' => '_self',
            'order' => 4,
        ]);

        // Create Footer Menu
        $footerMenu = Menu::create([
            'name' => 'Menu Footer',
            'location' => 'footer',
            'description' => 'Menu navigasi footer website',
            'is_active' => true,
        ]);

        // Create Footer Menu Items
        MenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Kebijakan Privasi',
            'url' => '/pages/privacy-policy',
            'type' => 'page',
            'target' => '_self',
            'order' => 0,
        ]);

        MenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Syarat & Ketentuan',
            'url' => '/pages/terms',
            'type' => 'page',
            'target' => '_self',
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'FAQ',
            'url' => '/pages/faq',
            'type' => 'page',
            'target' => '_self',
            'order' => 2,
        ]);

        // Create Social Media Menu
        $socialMenu = Menu::create([
            'name' => 'Menu Sosial Media',
            'location' => 'footer',
            'description' => 'Menu sosial media di footer',
            'is_active' => true,
        ]);

        // Create Social Media Menu Items
        MenuItem::create([
            'menu_id' => $socialMenu->id,
            'title' => 'Facebook',
            'url' => 'https://facebook.com/yourpage',
            'type' => 'custom',
            'target' => '_blank',
            'order' => 0,
        ]);

        MenuItem::create([
            'menu_id' => $socialMenu->id,
            'title' => 'Twitter',
            'url' => 'https://twitter.com/yourpage',
            'type' => 'custom',
            'target' => '_blank',
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $socialMenu->id,
            'title' => 'Instagram',
            'url' => 'https://instagram.com/yourpage',
            'type' => 'custom',
            'target' => '_blank',
            'order' => 2,
        ]);
    }
}
