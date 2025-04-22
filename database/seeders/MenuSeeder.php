<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Header Menu
        $headerMenu = Menu::create([
            'name' => 'Header Menu',
            'location' => 'header',
            'is_active' => true
        ]);

        // Header Menu Items
        $headerMenu->items()->create([
            'title' => 'Home',
            'url' => '/',
            'order' => 1,
            'type' => 'custom'
        ]);

        $blog = $headerMenu->items()->create([
            'title' => 'Blog',
            'url' => '/blog',
            'order' => 2,
            'type' => 'custom'
        ]);

        // Blog submenu items
        $blog->children()->createMany([
            [
                'menu_id' => $headerMenu->id,
                'title' => 'All Posts',
                'url' => '/blog',
                'order' => 1,
                'type' => 'custom'
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Categories',
                'url' => '/blog?view=categories',
                'order' => 2,
                'type' => 'custom'
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Tags',
                'url' => '/blog?view=tags',
                'order' => 3,
                'type' => 'custom'
            ]
        ]);

        $about = $headerMenu->items()->create([
            'title' => 'About',
            'url' => '/about',
            'order' => 3,
            'type' => 'custom'
        ]);

        $contact = $headerMenu->items()->create([
            'title' => 'Contact',
            'url' => '/contact',
            'order' => 4,
            'type' => 'custom'
        ]);

        // Create Footer Menu
        $footerMenu = Menu::create([
            'name' => 'Footer Menu',
            'location' => 'footer',
            'is_active' => true
        ]);

        // Footer Quick Links
        $quickLinks = $footerMenu->items()->create([
            'title' => 'Quick Links',
            'url' => '#',
            'order' => 1,
            'type' => 'custom'
        ]);

        $quickLinks->children()->createMany([
            [
                'menu_id' => $footerMenu->id,
                'title' => 'Home',
                'url' => '/',
                'order' => 1,
                'type' => 'custom'
            ],
            [
                'menu_id' => $footerMenu->id,
                'title' => 'Blog',
                'url' => '/blog',
                'order' => 2,
                'type' => 'custom'
            ],
            [
                'menu_id' => $footerMenu->id,
                'title' => 'About Us',
                'url' => '/about',
                'order' => 3,
                'type' => 'custom'
            ],
            [
                'menu_id' => $footerMenu->id,
                'title' => 'Contact',
                'url' => '/contact',
                'order' => 4,
                'type' => 'custom'
            ]
        ]);
    }
}
