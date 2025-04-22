<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage settings');
    }

    public function general()
    {
        $settings = Setting::where('group', 'general')
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Admin/Settings/General', [
            'settings' => $settings
        ]);
    }

    public function seo()
    {
        $settings = Setting::where('group', 'seo')
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Admin/Settings/Seo', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request, string $group)
    {
        $validated = $request->validate([
            'settings' => 'required|array'
        ]);

        foreach ($validated['settings'] as $key => $value) {
            Setting::set($key, $value, $group);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui');
    }

    public function clearCache()
    {
        cache()->flush();
        return redirect()->back()->with('success', 'Cache berhasil dibersihkan');
    }
}
