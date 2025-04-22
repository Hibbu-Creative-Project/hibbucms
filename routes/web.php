<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FrontendController;

// Frontend Routes
Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::get('/blog', [FrontendController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [FrontendController::class, 'post'])->name('blog.post');

// Frontend Page Route
Route::get('/pages/{slug}', [FrontendController::class, 'page'])->name('page');

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

Route::resource('pages', PageController::class);
Route::post('pages/{page}/publish', [PageController::class, 'publish'])->name('pages.publish');
Route::post('pages/{page}/unpublish', [PageController::class, 'unpublish'])->name('pages.unpublish');


require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
