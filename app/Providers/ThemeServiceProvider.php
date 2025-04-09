<?php

namespace App\Providers;

use App\Models\Theme;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('theme', function ($app) {
            if (!Schema::hasTable('themes')) {
                return new Theme([
                    'name' => 'Default Theme',
                    'folder_name' => 'default',
                    'is_active' => true
                ]);
            }

            return Theme::getActive() ?? new Theme([
                'name' => 'Default Theme',
                'folder_name' => 'default',
                'is_active' => true
            ]);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (!Schema::hasTable('themes')) {
            return;
        }

        // Share tema aktif ke semua view
        View::composer('*', function ($view) {
            $view->with('theme', app('theme'));
        });

        // Tambahkan path tema ke view finder
        $theme = app('theme');
        $themePath = base_path("themes/{$theme->folder_name}/views");

        if (file_exists($themePath)) {
            $this->app['view']->addLocation($themePath);
        }
    }
}
