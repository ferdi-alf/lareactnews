<?php


use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RedirectIfNotAdmin;
use App\Http\Controllers\AuthenticatedAdminSessionController;
use App\Http\Controllers\PendingNewsController;

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

Route::middleware('auth.admin')->group(function () {
    Route::get('/admin', [AdminController::class, 'admin'])->name('admin.dashboard');

    // pending news
    Route::get('/pending-news', [PendingNewsController::class, 'pendingNews'])->name('pending.news');
    Route::post('/post-news/id/{id}', [PendingNewsController::class, 'postPending'])->name('post.pending');
    Route::post('/news/delete/{id}', [PendingNewsController::class, 'delete'])->name('delete.news');
    Route::get('pending/view/id/{id}', [PendingNewsController::class, 'view'])->name('view.pending');
    // end pending news
    // akses admin
    Route::get('/data-admin', [AdminController::class, 'getAdmin'])->name('data.admin');
    Route::get('tambah/data-admin', [AdminController::class, 'GetAddAdmin'])->name('add.admin');
    Route::post('/post/add-admin', [AdminController::class, 'addAdmin'])->name('post.add.admin');

    // akses user
    Route::get('/data-user', [AdminController::class, 'getUser'])->name('data.user');
    Route::get('/add/data-user', [AdminController::class, 'getAddUser'])->name('add.user');
    Route::post('/post/add-user', [AdminController::class, 'addUser'])->name('post.add.user');
    Route::post('/update/user/id/{id}', [AdminController::class, 'updateUser'])->name('update.user');
    Route::delete('/delete/user/id/{id}', [AdminController::class, 'deleteUser'])->name('delete.user');

    // news controller
    Route::get('/newscontroller', [AdminController::class, 'newsControl'])->name('news.control');
    Route::get('/news/edit/id/{id}', [AdminController::class, 'editNews'])->name('edit.news');
    Route::post('/news/update', [AdminController::class, 'updateNews'])->name('update.news');
    Route::delete('/news/delete/{id}', [AdminController::class, 'deleteNews'])->name('delete.news');

    // nees insert 
    Route::get('/news-insert', [AdminController::class, 'insert'])->name('news.insert');
    Route::post('post/news', [AdminController::class, 'postNews'])->name('post.news');
});

// middleware user
Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('/dashboard', [NewsController::class, 'total'])->name('dashboard');
    Route::get('/news', [NewsController::class, 'show'])->name('my.news');
    // form news
    Route::get('form-news', [NewsController::class, 'formnews'])->name('formnews');
    Route::post('/news', [PendingNewsController::class, 'store'])->name('create.news');

    Route::get('/mynews', [NewsController::class, 'mynews'])->name('mynews');

    // pengeditan berita
    Route::get('/news/edit', [NewsController::class, 'edit'])->name('edit.news');
    // end dashboard
});
// end middleware admins


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';