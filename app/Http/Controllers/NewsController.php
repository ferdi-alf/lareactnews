<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\News;
use App\Models\View;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NewsCollection;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $newsData = new  NewsCollection(News::OrderByDesc('id')->paginate(10));

        $waktu = Carbon::now()->subHours(24);
        $newNewsData = News::where('created_at', '>', $waktu)->get();
        $newNews = new NewsCollection($newNewsData);

        $views = View::all();

        return Inertia::render('Homepage', [
            'title' => 'Cuyy Portal',
            'description' => 'Selamat datang di portal berita cuy universe',
            'news' => $newsData,
            'views' => $views,
            'newNews' => $newNews
        ]);
    }


    // view berita 
    public function view($id)
    {
        $news = News::findOrFail($id);
        return Inertia::render('ViewBerita', ['viewBerita' => $news]);
    }

    public function addViews(Request $request)
    {
        $idBerita = $request->input('id_berita');
        $ipAddress = $request->ip();

        $existingView = View::where('id_berita', $idBerita)
            ->where('ip_address', $ipAddress)
            ->first();

        if (!$existingView) {
            View::create([
                'id_berita' => $idBerita,
                'ip_address' => $ipAddress
            ]);

            $news = News::find($idBerita);
            $news->views += 1;
            $news->save();
        }

        return response()->json(['message' => 'Berhasil']);
    }
    // end view


    // // dashboard
    // public function show(News $news)
    // {
    //     $myNews = $news::where('author', auth()->user()->name)->get();

    //     $waktu = Carbon::now()->subHours(24);

    //     $totalBerita = $news::where('author', auth()->user()->name)->count();
    //     $totalBeritaHariIni = $news::where('author', auth()->user()->name)
    //         ->where('created_at', '>', $waktu)->count();

    //     $total = compact('totalBerita', 'totalBeritaHariIni');
    //     return Inertia::render('Dashboard', [
    //         'myNews' => $myNews,
    //         'total' => $total
    //     ]);
    // }


    // dashboard
    public function total(News $news)
    {
        $waktu = Carbon::now()->subHours(24);

        $totalBerita = $news::where('author', auth()->user()->name)->count();
        $totalBeritaHariIni = $news::where('author', auth()->user()->name)
            ->where('created_at', '>', $waktu)->count();
        $total = compact('totalBerita', 'totalBeritaHariIni');

        return Inertia::render('Dashboard', [
            'total' => $total
        ]);
    }


    // form berita
    public function formnews()
    {
        return Inertia::render('FormNews');
    }

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

        $authorName = Auth::user()->name;

        $news = new News();
        $news->title = $validasiData['title'];
        $news->description = $validasiData['description'];
        $news->category = $validasiData['category'];
        $news->author = $authorName;

        if ($request->has('image')) {
            $image = $request->file('image');

            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images/', $name);

            $news->foto = $name;
        }

        $news->save();

        return redirect()->back()->with('message', 'Berhasil Menambahkan Berita');
    }
    // end form berita

    // masuk ke mynews
    public function mynews(News $news)
    {
        $news = new NewsCollection($news::where('author', auth()->user()->name)
            ->OrderByDesc('id')->paginate(10));

        return Inertia::render('MyNews', [
            'news' => $news
        ]);
    }
    // end masuk ke mynews

    // logika untuk edit/update data
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }
    public function update(News $news, Request $request)
    {
        // Validasi data yang diterima dari front end
        $updateData = [];
        if ($request->title !== null) {
            $updateData['title'] = $request->title;
        }
        if ($request->description !== null) {
            $updateData['description'] = $request->description;
        }
        if ($request->category !== null) {
            $updateData['category'] = $request->category;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('/public/images', $imageName);

            $updateData['foto'] = $imageName;
        }

        News::where('id', $request->id)->update($updateData);

        return redirect()->route('dashboard')->with('message', 'Update Berita Berhasil');
    }
    // end update

    // masuk ke sesi hapus data
    public function delete(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('success', 'Berhasil Hapus Data');
    }
}
