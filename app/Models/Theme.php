<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'folder_name',
        'description',
        'version',
        'author',
        'screenshot_url',
        'is_active',
        'settings'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'settings' => 'array'
    ];

    public static function getActive()
    {
        return static::where('is_active', true)->first();
    }

    public function activate()
    {
        // Non-aktifkan tema lain
        static::where('is_active', true)->update(['is_active' => false]);

        // Aktifkan tema ini
        $this->is_active = true;
        $this->save();

        return $this;
    }

    public function getViewPath($view)
    {
        return "themes.{$this->folder_name}.views.{$view}";
    }

    public function getAssetPath($path)
    {
        return "themes/{$this->folder_name}/assets/{$path}";
    }
}
