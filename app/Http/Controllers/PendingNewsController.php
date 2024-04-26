<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use App\Models\RejectNews;
use App\Models\ConfirmNews;
use App\Models\PendingNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PendingNewsCollection;

class PendingNewsController extends Controller
{
    public function store(Request $request)
    {
        $validasiData = $request->validate(
            [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2040',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'category' => 'required|string|max:255',
            ],
            [
                'image.required' => 'Berita wajib memiliki gambar',
                'image.mimes' => 'image hanya boleh berextensi jpeg,png,jpg,webp',
                'title.required' => 'Title berita tidak boleh kosong',
                'description.required' => "description tidak boleh kosong",
                'category.required' => "category tidak boleh kosong"
            ]
        );

        $user = auth()->user();

        // Buat data pending_news baru
        $pendingNews = new PendingNews();
        $pendingNews->id_user = $user->id;
        $pendingNews->user_name = $user->name;
        $pendingNews->user_email = $user->email;
        $pendingNews->title_news = $validasiData['title'];
        $pendingNews->description_news = $validasiData['description'];

        $category = $validasiData['category'];
        if ($category === 'lainnya...(isi sendiri)') {
            $pendingNews->category = $validasiData['custom_category'];
        } else {
            $pendingNews->category = $category;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images/', $name);
            $pendingNews->foto = $name;
        }

        $pendingNews->save();

        return redirect()->back()->withErrors(['Berita berhasil diajukan untuk ditinjau.']);
    }
    // end form berita


    // masuk ke panding news
    public function pendingNews()
    {
        $admin = Auth::guard('admin')->user();
        $pendingNews = new PendingNewsCollection(PendingNews::OrderByDesc('id')->paginate(10));


        return Inertia::render('Admin/PendingNews', [
            'auth' => [
                'admin' => $admin
            ],
            'pendingNews' => $pendingNews,
        ]);
    }
    // end masuk ke panding news

    // post berita
    public function postPending($id)
    {
        $pendingNews = PendingNews::findOrFail($id);
        $admin = Auth::guard('admin')->user();

        $news = new News();
        $news->foto = $pendingNews->foto;
        $news->title = $pendingNews->title_news;
        $news->description = $pendingNews->description_news;
        $news->category = $pendingNews->category;
        $news->author = $pendingNews->user_name;
        $news->email = $pendingNews->user_email;
        $news->save();

        ConfirmNews::create([
            'id' => $id,
            'title' => $pendingNews->title_news,
            'user_name' => $pendingNews->user_name,
            'user_email' => $pendingNews->user_email,
            'admin_name' => $admin->name,
            'admin_email' => $admin->email
        ]);

        $pendingNews->delete();

        return back()->with('succes', 'Succes');
    }
    // end post berita

    // toal berita
    public function delete($id, Request $request)
    {

        $message = $request->input('message');
        $RejectNews = PendingNews::find($request->id);
        $admin = Auth::guard('admin')->user();


        RejectNews::create([
            'id' => $id,
            'title' => $RejectNews->title_news,
            'message' => $message,
            'user_name' => $RejectNews->user_name,
            'user_email' => $RejectNews->user_email,
            'admin_name' => $admin->name,
            'admin_email' => $admin->email,
        ]);

        $RejectNews->delete();

        return redirect()->back()->withErrors(['Berita berhasil diajukan untuk ditinjau.']);
    }
    // end tolak berita
}