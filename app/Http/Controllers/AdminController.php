<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\PendingNews;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\NewsCollection;

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
    public function getAdmin(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $data = Admin::orderByDesc('id');

        if ($request->has('search')) {
            $search = '%' . $request->search . '%';

            $data->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', $search)
                    ->orWhere('email', 'LIKE', $search);
            });
        }

        $data = new NewsCollection($data->paginate(10));

        return Inertia::render('Admin/DataAdmin', [
            'auth' => [
                'admin' => $admin
            ],
            'dataAdmin' => $data
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
            'name' => 'required|unique:admins,name',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'confirmPassword' => 'required|same:password|min:8'
        ], [
            'name.required' => 'nama tidak boleh kosong',
            'name.unique' => 'Nama sudah digunakan, silakan gunakan nama yang lain',
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
        $postAdmin->password = Hash::make($validate['password']);
        $postAdmin->save();

        return redirect()->route('data.admin');
    }
    // end handle admin Data

    // handle data eser
    public function getUser(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $data = User::orderByDesc('id');

        if ($request->has('search')) {
            $search = '%' . $request->search . '%';

            $data->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', $search)
                    ->orWhere('email', 'LIKE', $search);
            });
        }

        $data = new NewsCollection($data->paginate(10));

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

        return redirect()->route('data.user');
    }

    public function updateUser(Request $request)
    {
        $update = [];
        if ($request->name !== null) {
            $update['name'] = $request->name;
        }
        if ($request->email !== null) {
            $update['email'] = $request->email;
        }
        if ($request->password !== null) {
            $update['password'] = $request->password;
        }

        User::where('id', $request->id)->update($update);

        return redirect()->back();
    }

    public function deleteUser(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();

        return redirect()->back();
    }
    // end handle data user

    // news controller
    public function newsControl(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $news = News::orderByDesc('id');

        // Memeriksa apakah ada data pencarian
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';

            $news->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', $search)
                    ->orWhere('description', 'LIKE', $search)
                    ->orWhere('category', 'LIKE', $search);
            });
        }

        // Paginasi data
        $news = $news->paginate(10);

        return Inertia::render('Admin/NewsController', [
            'auth' => [
                'admin' => $admin
            ],
            'data' => $news
        ]);
    }


    public function editNews(News $news, Request $request)
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/EditNews', [
            'auth' => [
                'admin' => $admin
            ],
            'news' => $news->find($request->id)
        ]);
    }

    public function updateNews(News $news, Request $request)
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

        return redirect()->route('news.control')->with('message', 'Update Berita Berhasil');
    }

    public function deleteNews(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();

        return redirect()->back();
    }
    // end news controller

    // news insert
    public function insert()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/NewsInsert', [
            'auth' => [
                'admin' => $admin
            ]
        ]);
    }

    public function postNews(Request $request)
    {
        $validasi = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2040',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|max:15'
        ], [
            'image.required' => 'berita harus memiliki gambar',
            'image.image' => 'format gambar tidak cocok',
            'image.mimes' => 'format gambar hanya boleh jpg, jpeg, png, webp',
            'image.max' => 'ukuran file gambar terlalu tinggi',
            'title.required' => 'title tidak boleh kosong',
            'title.max' => 'title melebihi batas 255 karakter',
            'description.required' => 'description berita tak boleh kosong',
            'category.required' => 'category tak boleh kosong',
            'category.max' => 'category melebihi batas 15 karakter'
        ]);

        $admin = Auth::guard('admin')->user();
        $post = new News();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $name);
            $post->foto = $name;
        }

        $post->title = $validasi['title'];
        $post->description = $validasi['description'];
        $post->category = $validasi['category'];
        $post->author = $admin->name;
        $post->save();

        return redirect()->back();
    }
    // end news insert

    // settings
    public function settings()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/Settings', [
            'auth' => [
                'admin' => $admin
            ],
        ]);
    }

    public function updateAdmin(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        // Validasi input
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:admins,email,' . Auth::guard('admin')->id(),
            'oldPassword' => 'required_with:newPassword',
            'newPassword' => 'min:8|nullable',
            'confirmNewPassword' => 'required_with:newPassword|same:newPassword'
        ], [
            'oldPassword.required_with' => 'password lama wajib diisi',
            'newPassword.min' => 'password baru harus minimal 8 karakter',
            'confirmNewPassword.required_with' => 'konfirmasi password wajib diisi',
            'confirmNewPassword.same' => 'konfirmsi password harus sama dengan password baru yang ingin di masukan'
        ]);

        $update = [];

        if ($request->name !== null) {
            $update['name'] = $request->name;
        }

        if ($request->email !== null) {
            $update['email'] = $request->email;
        }

        // Check if the provided password matches the admin's password
        if (!Hash::check($request->oldPassword, $admin->password)) {
            return back()->withErrors(['oldPassword' => 'password salah, harap masukan password dengan benar sebelum mengganti']);
        }
        if ($request->newPassword !== null) {
            $update['password'] = Hash::make($request->newPassword);
        }


        if (!empty($update)) {
            Admin::where('id', Auth::guard('admin')->user()->id)->update($update);
        }

        return redirect()->back()->with('status', 'Admin info updated successfully.');
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ], [
            'password.required' => 'password tidak boleh kosong'
        ]);

        /** @var \App\Models\Admin $admin */
        $admin = Auth::guard('admin')->user();

        if (!Hash::check($request->password, $admin->password)) {
            return back()->withErrors(['password' => 'password salah, masukan password dengan benar']);
        }

        $admin->delete();
        return Redirect::to('/');
    }

    public function logout()
    {
        /** @var \App\Models\Admin $admin */
        Auth::guard('admin')->logout();

        return Redirect::to('/');
    }
    // end settings
}