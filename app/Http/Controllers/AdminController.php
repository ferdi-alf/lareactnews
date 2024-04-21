<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\PendingNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function admin()
    {
        $total = News::count();
        $pending = PendingNews::count();
        $totalAdmin = Admin::count();
        $totalUser = User::count();
        $admin = Auth::guard('admin')->user();

        $datachart = News::select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count'))
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->get();



        return Inertia::render('Admin/Admin', [
            'auth' => [
                'admin' => $admin
            ],
            'pendingNews' => $pending,
            'totalBerita' => $total,
            'totalAdmin' => $totalAdmin,
            'totalUser' => $totalUser,
            'chartData' => $datachart
        ]);
    }
}