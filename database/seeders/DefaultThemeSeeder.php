<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Theme::create([
        //     'name' => 'Default Theme',
        //     'slug' => 'default',
        //     'folder_name' => 'default',
        //     'description' => 'Tema default untuk HibbuCMS',
        //     'version' => '1.0.0',
        //     'author' => 'Hibbu Creative',
        //     'preview' => 'assets/images/preview.png',
        //     'is_active' => true,
        //     'settings' => [
        //         'primary_color' => '#0f172a',
        //         'secondary_color' => '#64748b',
        //         'accent_color' => '#0ea5e9',
        //         'font_family' => 'Inter',
        //         'show_hero' => true,
        //         'show_features' => true,
        //         'show_testimonials' => true,
        //         'show_blog' => true,
        //         'show_contact' => true
        //     ]
        // ]);
    }
}
