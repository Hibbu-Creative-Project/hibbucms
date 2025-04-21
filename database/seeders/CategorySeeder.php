<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Teknologi',
                'description' => 'Artikel seputar teknologi terkini',
                'color' => '#3498db',
            ],
            [
                'name' => 'Gaya Hidup',
                'description' => 'Tips dan trik seputar gaya hidup',
                'color' => '#2ecc71',
            ],
            [
                'name' => 'Bisnis',
                'description' => 'Informasi dan strategi bisnis',
                'color' => '#e74c3c',
            ],
            [
                'name' => 'Kesehatan',
                'description' => 'Artikel tentang kesehatan dan kebugaran',
                'color' => '#9b59b6',
            ],
            [
                'name' => 'Pendidikan',
                'description' => 'Informasi seputar dunia pendidikan',
                'color' => '#f1c40f',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'color' => $category['color'],
            ]);
        }
    }
}
