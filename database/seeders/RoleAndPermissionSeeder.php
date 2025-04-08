<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Content management
            'view content',
            'create content',
            'edit content',
            'delete content',
            'publish content',

            // Category management
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',

            // Media management
            'view media',
            'upload media',
            'delete media',

            // Settings
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $role = Role::create(['name' => 'Super Admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'Admin']);
        $role->givePermissionTo([
            'view users', 'create users', 'edit users',
            'view content', 'create content', 'edit content', 'delete content', 'publish content',
            'view categories', 'create categories', 'edit categories', 'delete categories',
            'view media', 'upload media', 'delete media',
            'manage settings'
        ]);

        $role = Role::create(['name' => 'Editor']);
        $role->givePermissionTo([
            'view content', 'create content', 'edit content', 'publish content',
            'view categories',
            'view media', 'upload media'
        ]);

        $role = Role::create(['name' => 'Author']);
        $role->givePermissionTo([
            'view content', 'create content', 'edit content',
            'view categories',
            'view media', 'upload media'
        ]);
    }
}
