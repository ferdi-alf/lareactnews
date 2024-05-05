<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\News;
use App\Models\View;
use Inertia\Inertia;
use App\Models\RejectNews;
use App\Models\ConfirmNews;
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
    }
    // end view


    // dashboard
    public function total(News $news)
    {
        $waktu = Carbon::now()->subHours(24);
        $user = Auth::user();

        $totalBerita = $news::where('author', auth()->user()->name)->count();
        $totalBeritaHariIni = $news::where('author', auth()->user()->name)
            ->where('created_at', '>', $waktu)->count();

        // polar chart
        $totalRejected = RejectNews::where('user_name', auth()->user()->name)->count();
        $totalConfirm = ConfirmNews::where('user_name', auth()->user()->name)->count();
        // end polar chart

        // pesan admin
        $pesanReject = RejectNews::where('user_name', $user->name)->get()->map(function ($pesan) {
            $pesan->type = 'reject';
            return $pesan;
        });
        $pesanConfirm = ConfirmNews::where('user_name', $user->name)->get()->map(function ($pesan) {
            $pesan->type = 'confirm';
            return $pesan;
        });

        $pesanAdmin = compact('pesanReject', 'pesanConfirm');
        // end pesan admin

        $total = compact('totalBerita', 'totalBeritaHariIni', 'totalRejected', 'totalConfirm');

        return Inertia::render('Dashboard', [
            'total' => $total,
            'pesanAdmin' => $pesanAdmin
        ]);
    }


    // form berita
    public function formnews()
    {
        return Inertia::render('FormNews');
    }
    // end masuk ke form berita

    // masuk ke mynews
    public function mynews(Request $request)
    {
        $newsQuery = News::where('author', auth()->user()->name)->orderByDesc('id');

        if ($request->has('search')) {
            $search = '%' . $request->search . '%';

            $newsQuery->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', $search)
                    ->orWhere('description', 'LIKE', $search)
                    ->orWhere('category', 'LIKE', $search);
            });
        }

        $news = $newsQuery->paginate(10);

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

}