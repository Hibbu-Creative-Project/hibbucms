<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
