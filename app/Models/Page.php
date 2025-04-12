<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'featured_image',
        'meta_description',
        'meta_keywords',
        'status',
        'order',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($page) {
            if (empty($page->slug)) {
                $page->slug = str($page->title)->slug();
            }
        });
    }
}
