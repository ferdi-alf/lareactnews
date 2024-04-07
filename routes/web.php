<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;

Route::get('/', [NewsController::class, 'index']);
//increment view
Route::post('/add-view', [NewsController::class, 'addViews']);
// view berita
Route::get('berita/view/id/{id}', [NewsController::class, 'view'])
    ->name('view.berita');


// dahsboard
Route::get('/dashboard', [NewsController::class, 'total'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/news', [NewsController::class, 'show'])->middleware(['auth', 'verified'])->name('my.news');
// form news
Route::get('form-news', [NewsController::class, 'formnews'])->name('formnews');
Route::post('/news', [NewsController::class, 'store'])->middleware(['auth', 'verified'])->name('create.news');

// pengeditan berita
Route::get('/news/edit', [NewsController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.news');
Route::post('/news/update', [NewsController::class, 'update'])->middleware(['auth', 'verified'])->name('update.news');

// penghapusan berita
Route::post('/news/delete/', [NewsController::class, 'delete'])->middleware(['auth', 'verified'])->name('delete.news');


// ->middleware('increment.views');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';