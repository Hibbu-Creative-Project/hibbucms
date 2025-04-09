@extends('theme::layouts.main')

@section('title', 'Welcome')

@section('content')
    <!-- Hero Section -->
    <div class="card text-center py-8 px-4 mb-12">
        <h1 class="text-4xl font-bold mb-4">Welcome to {{ config('app.name') }}</h1>
        <p class="text-gray-600 text-lg mb-6">Discover our latest articles and insights</p>
        <a href="{{ url('/blog') }}" class="btn btn-primary">Read Our Blog</a>
    </div>

    <!-- Featured Posts -->
    @if ($posts->count() > 0)
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Latest Posts</h2>
            <div class="post-grid">
                @foreach ($posts as $post)
                    <div class="card post-card">
                        @if ($post->featured_image)
                            <img src="{{ $post->featured_image }}" alt="{{ $post->title }}" class="post-card-image">
                        @endif
                        <div class="post-content">
                            <h3 class="post-title">
                                <a href="{{ url('/blog/' . $post->slug) }}">{{ $post->title }}</a>
                            </h3>
                            <p class="post-excerpt">{{ Str::limit($post->excerpt ?? $post->content, 120) }}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">
                                    {{ $post->published_at->format('M d, Y') }}
                                </span>
                                @if ($post->category)
                                    <a href="{{ url('/blog?category=' . $post->category->slug) }}"
                                        class="text-sm text-primary">
                                        {{ $post->category->name }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    <!-- Categories Section -->
    @if ($categories->count() > 0)
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Categories</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                @foreach ($categories as $category)
                    <a href="{{ url('/blog?category=' . $category->slug) }}"
                        class="card hover:shadow-md transition-shadow">
                        <h3 class="font-semibold">{{ $category->name }}</h3>
                        <p class="text-sm text-gray-600">{{ $category->posts_count }} posts</p>
                    </a>
                @endforeach
            </div>
        </div>
    @endif

    <!-- Tags Cloud -->
    @if ($tags->count() > 0)
        <div>
            <h2 class="text-2xl font-bold mb-6">Popular Tags</h2>
            <div class="flex flex-wrap gap-2">
                @foreach ($tags as $tag)
                    <a href="{{ url('/blog?tag=' . $tag->slug) }}"
                        class="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        {{ $tag->name }}
                        <span class="text-gray-600">({{ $tag->posts_count }})</span>
                    </a>
                @endforeach
            </div>
        </div>
    @endif
@endsection
