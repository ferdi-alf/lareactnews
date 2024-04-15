<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class RedirectIfNotAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // login pertama jika user belum login
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('login.admin')->withErrors(['Silakan login.']);
        }

        // logic kedua jika user login tanpa remember
        if (Auth::guard('admin') && !Cookie::has('remember_me')) {
            return redirect()->route('login.admin')->withErrors(['silahkan login kembali']);
        }

        // logic ketiga jika user telah meceklis remember_me
        if (Auth::guard('admin') && Cookie::has('remember_me')) {
            return $next($request);
        }
    }
}