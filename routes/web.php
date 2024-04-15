<?php


use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RedirectIfNotAdmin;
use App\Http\Controllers\AuthenticatedAdminSessionController;

// index berita
Route::get('/', [NewsController::class, 'index']);
//increment view
Route::post('/add-view', [NewsController::class, 'addViews']);
// view berita
Route::get('berita/view/id/{id}', [NewsController::class, 'view'])
    ->name('view.berita');
// end index berita


Route::get('/login-admin', [AuthenticatedAdminSessionController::class, 'loginadmin'])->name('login.admin');
Route::post('/loginadmin', [AuthenticatedAdminSessionController::class, 'postloginadmin']);

Route::middleware([RedirectIfNotAdmin::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'admin'])->name('admin.dashboard');
});

// middleware user
Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('/dashboard', [NewsController::class, 'total'])->name('dashboard');
    Route::get('/news', [NewsController::class, 'show'])->name('my.news');
    // form news
    Route::get('form-news', [NewsController::class, 'formnews'])->name('formnews');
    Route::post('/news', [NewsController::class, 'store'])->name('create.news');

    Route::get('/mynews', [NewsController::class, 'mynews'])->name('mynews');

    // pengeditan berita
    Route::get('/news/edit', [NewsController::class, 'edit'])->name('edit.news');
    Route::post('/news/update', [NewsController::class, 'update'])->name('update.news');

    // penghapusan berita
    Route::post('/news/delete/', [NewsController::class, 'delete'])->name('delete.news');
    // end dashboard
});
// end middleware admins


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';