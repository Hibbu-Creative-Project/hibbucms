<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PageController;

Route::get('/admin', function () {
    return redirect()->route('dashboard');
});


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

    // User Routes
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class)->except(['show']);

    // Page Routes
    Route::resource('pages', PageController::class);
    Route::post('pages/{page}/publish', [PageController::class, 'publish'])->name('pages.publish');
    Route::post('pages/{page}/unpublish', [PageController::class, 'unpublish'])->name('pages.unpublish');


    // Theme Management
    Route::prefix('themes')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\ThemeController::class, 'index'])->name('themes.index');
        Route::post('/{theme}/activate', [App\Http\Controllers\Admin\ThemeController::class, 'activate'])->name('themes.activate');
        Route::post('/scan', [App\Http\Controllers\Admin\ThemeController::class, 'scan'])->name('themes.scan');
        Route::delete('/{theme}', [App\Http\Controllers\Admin\ThemeController::class, 'destroy'])->name('themes.destroy');
        Route::post('/upload', [App\Http\Controllers\Admin\ThemeController::class, 'upload'])->name('themes.upload');
    });
});