<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Tutorial',
                'description' => 'Panduan langkah demi langkah',
                'color' => '#e74c3c',
            ],
            [
                'name' => 'Tips dan Trik',
                'description' => 'Kumpulan tips dan trik berguna',
                'color' => '#3498db',
            ],
            [
                'name' => 'Berita',
                'description' => 'Berita terkini',
                'color' => '#2ecc71',
            ],
            [
                'name' => 'Review',
                'description' => 'Ulasan produk dan layanan',
                'color' => '#f1c40f',
            ],
            [
                'name' => 'Inspirasi',
                'description' => 'Cerita inspiratif',
                'color' => '#9b59b6',
            ],
            [
                'name' => 'Analisis',
                'description' => 'Analisis mendalam',
                'color' => '#34495e',
            ],
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag['name'],
                'slug' => Str::slug($tag['name']),
                'description' => $tag['description'],
                'color' => $tag['color'],
            ]);
        }
    }
}