<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AdminController extends Controller
{
    public function admin(Request $request)
    {
        // Jika pengguna telah login dengan opsi "Remember Me", biarkan dia masuk
        return Inertia::render('Admin/Admin');
    }
}