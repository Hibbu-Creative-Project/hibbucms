<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ThemeController extends Controller
{
    public function index()
    {
        $themes = Theme::all();

        return Inertia::render('Admin/Themes/Index', [
            'themes' => $themes
        ]);
    }

    public function activate(Theme $theme)
    {
        $theme->activate();

        return redirect()->back()->with('success', 'Theme activated successfully');
    }

    public function scan()
    {
        $themesPath = base_path('themes');
        $directories = File::directories($themesPath);

        foreach ($directories as $directory) {
            $folderName = basename($directory);
            $configPath = $directory . '/theme.json';

            if (File::exists($configPath)) {
                $config = json_decode(File::get($configPath), true);

                Theme::updateOrCreate(
                    ['folder_name' => $folderName],
                    [
                        'name' => $config['name'],
                        'slug' => $config['slug'],
                        'description' => $config['description'] ?? null,
                        'version' => $config['version'],
                        'author' => $config['author'] ?? null,
                        'settings' => $config['settings'] ?? null,
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Themes scanned successfully');
    }

    public function destroy(Theme $theme)
    {
        // Jangan izinkan menghapus tema yang sedang aktif
        if ($theme->is_active) {
            return redirect()->back()->with('error', 'Cannot delete active theme');
        }

        // Hapus folder tema jika ada
        $themePath = base_path("themes/{$theme->folder_name}");
        if (File::exists($themePath)) {
            File::deleteDirectory($themePath);
        }

        // Hapus dari database
        $theme->delete();

        return redirect()->back()->with('success', 'Theme deleted successfully');
    }
}
