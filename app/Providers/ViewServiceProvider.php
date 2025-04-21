<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Helpers\MenuHelper;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Share menu with all views
        View::share('menu', MenuHelper::render('header'));

        // Alternatively, you can use composer for specific views
        // View::composer(['themes.default.views.layouts.main', 'themes.*.views.layouts.*'], function ($view) {
        //     $view->with('menu', MenuHelper::render('header'));
        // });
    }
}
