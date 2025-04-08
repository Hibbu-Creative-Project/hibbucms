<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@admin.com',
            'password' => Hash::make('password'),
            'bio' => 'Super Administrator of the system',
        ]);
        $superAdmin->assignRole('Super Admin');

        // Create Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'bio' => 'Administrator of the system',
        ]);
        $admin->assignRole('Admin');

        // Create Editor
        $editor = User::create([
            'name' => 'Editor',
            'email' => 'editor@admin.com',
            'password' => Hash::make('password'),
            'bio' => 'Content Editor',
        ]);
        $editor->assignRole('Editor');

        // Create Author
        $author = User::create([
            'name' => 'Author',
            'email' => 'author@admin.com',
            'password' => Hash::make('password'),
            'bio' => 'Content Author',
        ]);
        $author->assignRole('Author');
    }
}
