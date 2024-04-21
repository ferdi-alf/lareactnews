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

            
            return redirect()->intended('/admin');
        } else {
            return redirect()->back()->withErrors(['message' => 'Email dan password salah']);
        }
    }
}