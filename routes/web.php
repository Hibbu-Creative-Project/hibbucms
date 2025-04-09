<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Media Routes
    Route::get('media', [MediaController::class, 'index'])->name('media.index');
    Route::post('media', [MediaController::class, 'store'])->name('media.store');
    Route::get('media/{id}', [MediaController::class, 'show'])->name('media.show');
    Route::delete('media/{id}', [MediaController::class, 'destroy'])->name('media.destroy');
    Route::get('media/{id}/download', [MediaController::class, 'download'])->name('media.download');

    // Category Routes
    Route::resource('categories', CategoryController::class);

    // Tag Routes
    Route::resource('tags', TagController::class);

    // Post Routes
    Route::resource('posts', PostController::class);
    Route::post('posts/{post}/publish', [PostController::class, 'publish'])->name('posts.publish');
    Route::post('posts/{post}/unpublish', [PostController::class, 'unpublish'])->name('posts.unpublish');

    // Theme Management
    Route::prefix('themes')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\ThemeController::class, 'index'])->name('themes.index');
        Route::post('/{theme}/activate', [App\Http\Controllers\Admin\ThemeController::class, 'activate'])->name('themes.activate');
        Route::post('/scan', [App\Http\Controllers\Admin\ThemeController::class, 'scan'])->name('themes.scan');
        Route::delete('/{theme}', [App\Http\Controllers\Admin\ThemeController::class, 'destroy'])->name('themes.destroy');
        Route::post('/upload', [App\Http\Controllers\Admin\ThemeController::class, 'upload'])->name('themes.upload');
    });
});

// User Routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class)->except(['show']);
});

// Frontend Routes
Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::get('/blog', [FrontendController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [FrontendController::class, 'post'])->name('blog.post');

// Route untuk mengakses asset tema
Route::get('themes/{theme}/{path}', function ($theme, $path) {
    $filePath = base_path("themes/{$theme}/{$path}");

    if (!File::exists($filePath)) {
        abort(404);
    }

    $mimeType = File::mimeType($filePath);

    return Response::file($filePath, [
        'Content-Type' => $mimeType
    ]);
})->where('path', '.*');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
