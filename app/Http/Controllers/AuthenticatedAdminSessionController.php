<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;


class AuthenticatedAdminSessionController extends Controller
{
    public function loginadmin()
    {
        return Inertia::render('Auth/LoginAdmin');
    }

    public function postloginadmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ], [
            'email.required' => 'Email tidak boleh kosong ',
            'email.email' => 'format email tidak valid',
            'password.required' => 'Password tidak boleh kosong'
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::guard('admin')->attempt($credentials, $remember)) {
            if ($remember) {
                $user = Auth::user();
                $rememberToken = Str::random(60); // Atau gunakan token yang unik
                Cookie::queue('remember_token', $rememberToken, 60 * 24 * 30); // Simpan dalam cookie selama 30 hari
            } else {
                // Hapus cookie remember jika sebelumnya disimpan
                Cookie::queue(Cookie::forget('remember_token'));
            }
            return redirect()->intended('/admin');
        } else {
            return redirect()->back()->withErrors(['message' => 'Email dan password salah']);
        }
    }
}