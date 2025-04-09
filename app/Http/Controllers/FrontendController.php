<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function home()
    {
        $posts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take(6)
            ->get();

        $categories = Category::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        $tags = Tag::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        return view('theme::pages.home', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function blog(Request $request)
    {
        $posts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->when($request->category, function ($query, $category) {
                return $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->tag, function ($query, $tag) {
                return $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('slug', $tag);
                });
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        $categories = Category::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        $tags = Tag::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        return view('theme::pages.blog', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function post($slug)
    {
        $post = Post::with(['category', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $relatedPosts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                return $query->where('category_id', $post->category_id)
                    ->orWhereHas('tags', function ($q) use ($post) {
                        $q->whereIn('id', $post->tags->pluck('id'));
                    });
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        return view('theme::pages.post', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
