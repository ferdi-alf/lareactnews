<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\PendingNews;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();
        $newsFromUsers = new NewsCollection(News::get()->whereBetween('created_at', [$startMonth, $endMonth]));

        return Inertia::render('Admin/Admin', [
            'auth' => [
                'admin' => $admin
            ],
            'pendingNews' => $pending,
            'totalBerita' => $total,
            'totalAdmin' => $totalAdmin,
            'totalUser' => $totalUser,
            'chartData' => $datachart,
            'fromUsers' => $newsFromUsers
        ]);
    }

    // handle admin Data
    public function getAdmin()
    {
        $admin = Auth::guard('admin')->user();
        $dataAdmin = new NewsCollection(Admin::orderByDesc('id')->paginate(5));

        return Inertia::render('Admin/DataAdmin', [
            'auth' => [
                'admin' => $admin
            ],
            'dataAdmin' => $dataAdmin
        ]);
    }

    public function GetAddAdmin()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/AddAdmin', [
            'auth' => [
                'admin' => $admin
            ]
        ]);
    }

    public function addAdmin(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'confirmPassword' => 'required|same:password'
        ], [
            'name.required' => 'nama tidak boleh kosong',
            'email.required' => 'email tidak boleh kosong',
            'email.email' => 'email tidak valid',
            'password.required' => 'password tidak boleh kosong',
            'password.min' => 'password minimal 8 karakter',
            'confirmPassword.required' => 'confirm password tak boleh kosong',
            'confirmPassword.same' => 'konfirmasi password dan password harus sama'
        ]);

        $postAdmin = new Admin();
        $postAdmin->name = $validate['name'];
        $postAdmin->email = $validate['email'];
        $postAdmin->password = $validate['password'];
        $postAdmin->save();

        return redirect()->back()->withErrors(['berhasil menambah data admin']);
    }
    // end handle admin Data

    // handle data eser
    public function getUser()
    {
        $admin = Auth::guard('admin')->user();
        $data = new NewsCollection(User::OrderByDesc('id')->paginate('5'));

        return Inertia::render('Admin/DataUser', [
            'auth' => [
                'admin' => $admin
            ],
            'dataUser' => $data
        ]);
    }

    public function getAddUser()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/AddUser', [
            'auth' => [
                'admin' => $admin
            ]
        ]);
    }
    public function addUser(Request $request)
    {
        $validasi = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'confirmPassword' => 'required|same:password|min:8'
        ], [
            'name.required' => 'nama tidak boleh kosong',
            'email.required' => 'email tidak boleh kosong',
            'email.email' => 'format email tidak valid',
            'password.required' => 'password tidak boleh kosong',
            'password.min' => 'password minimal 8 karakter',
            'confirmPassword.required' => 'konfirmasi password tidak boleh kosong',
            'confirmPassword.same' => 'password dan korfirmasi password harus sama'
        ]);

        $post = new User();
        $post->name = $validasi['name'];
        $post->email = $validasi['email'];
        $post->password = $validasi['password'];
        $post->save();

        return redirect()->back();
    }
    // end handle data user
}