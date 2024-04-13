<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AuthenticatedAdminSessionController extends Controller
{
    public function loginadmin()
    {
        return Inertia::render('Auth/LoginAdmin');
    }
}
