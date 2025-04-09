<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class Theme extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'folder_name',
        'description',
        'version',
        'author',
        'preview',
        'is_active',
        'settings'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'settings' => 'array'
    ];

    protected $appends = [
        'preview_url',
        'has_preview'
    ];

    public function getHasPreviewAttribute()
    {
        if (!$this->preview) {
            return false;
        }

        $previewPath = base_path("themes/{$this->folder_name}/{$this->preview}");
        return File::exists($previewPath);
    }

    public function getPreviewUrlAttribute()
    {
        if (!$this->has_preview) {
            return null;
        }
        return url("themes/{$this->folder_name}/{$this->preview}");
    }

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
        return url("themes/{$this->folder_name}/assets/{$path}");
    }
}
