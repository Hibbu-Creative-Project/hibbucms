<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
class MenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Menus/Index');
    }
}
