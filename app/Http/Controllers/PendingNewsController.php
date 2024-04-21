<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use App\Models\PendingNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $pendingNews->category = $validasiData['category'];

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
        $data = PendingNews::get();
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Admin/PendingNews', [
            'auth' => [
                'admin' => $admin
            ],
            'data' => $data
        ]);
    }
    // end masuk ke panding news
}