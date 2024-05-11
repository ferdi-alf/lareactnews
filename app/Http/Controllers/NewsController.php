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

        $waktu = Carbon::now()->startOfWeek();
        $endWaktu = Carbon::now()->endOfWeek();

        // pesan admin
        $allPesan = RejectNews::where('user_name', $user->name)
            ->whereBetween('created_at', [$waktu, $endWaktu])
            ->orderBy('created_at', 'desc')
            ->get()->map(function ($pesan) {
                $pesan->type = 'reject';
                return $pesan;
            })->concat(
                ConfirmNews::where('user_name', $user->name)
                    ->whereBetween('created_at', [$waktu, $endWaktu])
                    ->orderBy('created_at', 'desc')
                    ->get()->map(function ($pesan) {
                        $pesan->type = 'confirm';
                        return $pesan;
                    })
            );


        $allPesan = $allPesan->sortByDesc('created_at');
        // end pesan admin

        $total = compact('totalBerita', 'totalBeritaHariIni', 'totalRejected', 'totalConfirm');

        return Inertia::render('Dashboard', [
            'total' => $total,
            'pesanAdmin' => $allPesan
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


    // masuk ke sesi hapus data

}